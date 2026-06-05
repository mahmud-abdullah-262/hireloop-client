'use server'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:8000';


export const getCompanyJobs = async (companyId, status = 'active') => {

  const url = `${baseUrl}/api/jobs/?companyId=${companyId}&status=${status}`;
  console.log(url , 'url')  
  
  const res = await fetch(url);
  const data = await res.json();
  return data;
}