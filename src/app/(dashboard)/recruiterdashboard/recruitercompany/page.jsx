import React from 'react';
import RecruiterCompanyPage from './RecruiterCompanyPage';
import { getSessionData } from '@/lib/session/getSession';

const page = () => {
  const user = getSessionData()
  return (
    <div className='w-full'>
      <RecruiterCompanyPage user={user}/>
    </div>
  );
};

export default page;