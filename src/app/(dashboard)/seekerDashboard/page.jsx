import CustomTable from '@/app/components/CustomTable';

import { SeekerStatCard } from '@/app/components/seekerStatCard';
import { getApplicationsByApplicantId } from '@/lib/api/fetchFunctions';
import { getSessionData } from '@/lib/session/getSession';
import React from 'react';

const SeekerDashboard = async () => {
    const user = await getSessionData()
    const applications = await getApplicationsByApplicantId(user.id) 
  return (
    <div className='p-4 w-full space-y-6'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>Seeker Dashboard</h1>
      <SeekerStatCard></SeekerStatCard>
      <h1 className='text-xl font-bold'>Applications</h1>
      <CustomTable applications={applications}></CustomTable>
    </div>
  );
};

export default SeekerDashboard;