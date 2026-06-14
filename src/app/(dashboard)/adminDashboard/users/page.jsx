import { getUsers } from '@/lib/api/fetchFunctions';
import React from 'react';
import UserPageClient from './UserPageClient';

const page = async () => {
    const data = await getUsers();
  const users = data.users;
  return ( <div className='w-full'>
    <UserPageClient users={users}/>
  </div>);
};

export default page;