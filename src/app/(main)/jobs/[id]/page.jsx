import JobDetailCard from '@/app/components/JobDetailCard';
import { getJobById } from '@/lib/api/fetchFunctions';
import React from 'react';

const JobDetails = async ({params}) => {
  const {id} = await params;
  console.log(id, 'job id')
  const job = await getJobById(id)
  return (
    <JobDetailCard job={job}/>
  );
};

export default JobDetails;