import { getApplicationsByApplicantId } from '@/lib/api/fetchFunctions';
import { getSessionData } from '@/lib/session/getSession';
import React from 'react';
import { Chip, Table } from '@heroui/react';
import Link from 'next/link';
import ApplyTable from '@/app/components/CustomTable';
const SeekerApplicationsPage = async () => {
  const user = await getSessionData()
  const applications = await getApplicationsByApplicantId(user.id) 
  console.log(user, 'user form dashboard')
  return (
    <div className='p-6 space-y-8 w-full'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>Applications</h1>
       <ApplyTable applications={applications} ></ApplyTable>
    </div>
  );
};

export default SeekerApplicationsPage;