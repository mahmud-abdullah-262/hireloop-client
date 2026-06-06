import React from 'react';
import PostJobForm from './PostJobForm';
import { getLoggedInRecruiterCompany } from '@/lib/api/fetchFunctions';



const page = async () => {
  const company = await getLoggedInRecruiterCompany();
  console.log(company, 'data from post job form')
  return (
    <div className='w-full'>
      <PostJobForm company={company}/>
    </div>
  );
};

export default page;