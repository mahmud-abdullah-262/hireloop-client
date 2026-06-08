'use server'

import { serverFetch } from "../core/server";
import { getSessionData } from "../session/getSession";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:8000';


// export const getCompanyJobs = async (companyId, status = 'active') => {

//   const url = `${baseUrl}/api/jobs/?companyId=${companyId}&status=${status}`;
//   console.log(url , 'url')  
  
//   const res = await fetch(url);
//   const data = await res.json();
//   return data;
// }

export const getCompanyJobs = async (companyId, status = 'active') => {
  console.log(companyId, 'companyId form action')
  return await serverFetch(`/api/jobs/?companyId=${companyId}&status=${status}`)
}

export const getRecruiterCompany = async(recruiterId) => {
  return await serverFetch(`/api/myCompany?recruiterId=${recruiterId}`)
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
  return await serverFetch(`/api/applications?${applicantId}`)
}