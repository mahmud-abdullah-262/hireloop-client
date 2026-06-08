import JobApply from '@/app/components/JobApply';
import { getApplicationsByApplicantId, getJobById } from '@/lib/api/fetchFunctions';
import { getSessionData } from '@/lib/session/getSession';
import { redirect } from 'next/navigation';
import React from 'react';

const ApplyPage = async ({params}) => {
  const { id } = await params;
  const user = await getSessionData();
  const job = await getJobById(id);
  const applications = await getApplicationsByApplicantId(user.id);
  
  const plan = {
    name: "Free",
    maxLimitForMount: 3
  }

  if(!user){
    redirect(`/signin?redirect=/jobs/${id}/apply`)
  }

  if(user.role !== 'seeker'){
    return(
      <div className='flex justify-center items-center my-10 w-11/12 mx-auto'>
        <h1 className='text-center text-md text-white/70 font-bold'>Only Job Seeker can Apply this job. Please Login to seeker account to proceed!</h1>
      </div>
    )
  }

  if(applications.length >= plan.maxLimitForMount){
    return (
      <div className='flex justify-center items-center my-10 w-11/12 mx-auto'>
        <h1 className='text-center text-md text-white/70 font-bold'>On the free plan, you can apply for only three jobs per month.</h1>
      </div>
    )
  }



  return (
    <div>
      <h1 className='text-bold text-center my-4 text-md'>You have used {applications.length} of your {plan.maxLimitForMount} job applications for this month.</h1>
      <JobApply job={job} applicant={user}/>
    </div>
  );
};

export default ApplyPage;