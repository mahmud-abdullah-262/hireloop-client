import JobCard from '@/app/components/JobCard';
import { getAllJobs } from '@/lib/api/fetchFunctions';
import { Card } from '@heroui/react';
import Link from 'next/link';
import React from 'react';


// dummy data
// {
//   "_id": {
//     "$oid": "6a2528ad97de561d0d00f08f"
//   },
//   "title": "Policy Communications Manager",
//   "category": "Communications",
//   "type": "Full-time",
//   "salaryMin": "100000",
//   "salaryMax": "145000",
//   "currency": "USD",
//   "city": "Menlo Park",
//   "country": "USA",
//   "isRemote": false,
//   "deadline": "2026-07-18",
//   "responsibilities": "Develop and execute communications strategies around Meta's privacy and content policies. Draft public statements, blog posts, and media responses. Liaise with government affairs and legal teams.",
//   "requirements": "6+ years in communications, policy, or public affairs. Excellent writing and media relations skills. Experience navigating complex regulatory environments.",
//   "benefits": "Competitive base and bonus. Meta apps and device benefits. Generous parental leave.",
//   "company": "meta",
//   "companyId": "6a25254997de561d0d00f064",
//   "status": "active",
//   "postedAt": "2026-06-07T10:45:00.000Z",
//   "isPublic": true,
//   "createdAt": {
//     "$date": "2026-06-07T10:45:00.000Z"
//   }
// }




const page = async () => {
  const jobData = await getAllJobs();
  console.log(jobData)
  return (
    <div className='flex flex-col gap-4 my-10'>
      <h1 className='text-center text-2xl md:text-3xl lg:text-5xl mb-4'>Availavle Jobs</h1>
      <div className='grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-11/12 mx-auto'>
{jobData.map((job, ind) => 
<JobCard key={ind} job={job}></JobCard>
  
)}
      </div>
    </div>
  );
};

export default page;