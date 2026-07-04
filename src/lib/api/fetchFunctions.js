'use server'

import { redirect } from "next/navigation";
import { protectedFetch, serverFetch } from "../core/server";
import { getSessionData } from "../session/getSession";
import { headers } from "next/headers";
import { auth } from "../auth";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:8000';


export const getCompany = async (searchQu) => {
return protectedFetch(`/api/companies?${searchQu}`)
}

export const getCompanyJobs = async (companyId, status = 'active') => {
  // console.log(companyId, 'companyId form action')
  return await protectedFetch(`/api/jobs/?companyId=${companyId}&status=${status}`)
}

export const getRecruiterCompany = async(recruiterId) => {
  return await protectedFetch(`/api/myCompany?recruiterId=${recruiterId}`)
}

export const getAllJobs = async(query) => { 
  // প্যারামিটারে কুয়েরি নিলাম, যেটা ক্লায়েন্ট সাইড থেকে আসছে, সার্ভারে ফেচ করার সময় প্যাথে কুয়েরি সেট করে দিলাম।

  return await serverFetch(`/api/jobs?${query}`)
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


export const getUsers = async (page = 2, size = 6) => {
  const limit = size;
  const offset = (page - 1) * size;

  const result = await auth.api.listUsers({
    query: {
      sortBy: "createdAt",
      sortDirection: "desc",
      limit,
      offset,
    },
    headers: await headers(),
  });

  const { users, total } = result;
  const totalPages = Math.ceil(total / size);

  return {
    users,
    total,
    totalPages,
    currentPage: page,
    size
  };
};

export const subscriptionsByAdmin = async (query) => {
  return await protectedFetch(`/api/subscriptions?${query}`)
}

