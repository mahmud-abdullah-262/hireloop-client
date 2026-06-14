'use server'

import { redirect } from "next/navigation";
import { protectedFetch, serverFetch } from "../core/server";
import { getSessionData } from "../session/getSession";
import { headers } from "next/headers";
import { auth } from "../auth";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:8000';


export const getCompany = async () => {
return protectedFetch('/api/companies')
}

export const getCompanyJobs = async (companyId, status = 'active') => {
  // console.log(companyId, 'companyId form action')
  return await protectedFetch(`/api/jobs/?companyId=${companyId}&status=${status}`)
}

export const getRecruiterCompany = async(recruiterId) => {
  return await protectedFetch(`/api/myCompany?recruiterId=${recruiterId}`)
}

export const getAllJobs = async() => {
  return await serverFetch(`/api/jobs`)
}

export const getJobById = async(jobId) =>{
  return await serverFetch(`/api/jobs/${jobId}`)
}
export const getLoggedInRecruiterCompany = async () =>{
  const user = await getSessionData()
  const company = getRecruiterCompany(user.id);
  return company;
}


export const getApplicationsByApplicantId = async (applicantId) => {
  return await protectedFetch(`/api/applications?applicantId=${applicantId}`)
}

export const getPlansData = async (planId) => {
  return await serverFetch(`/api/plans?planId=${planId}`)
}


export const getUsers = async () => {
  const users = await auth.api.listUsers({
    query: {
      
        sortBy: "createdAt",
        sortDirection: "desc",
      
    },
    // This endpoint requires session cookies.
    headers: await headers(),
});
return users
}

