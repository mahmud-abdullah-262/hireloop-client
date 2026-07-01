import { getUsers } from '@/lib/api/fetchFunctions';
import React from 'react';
import UserPageClient from './UserPageClient';

const page = async ({searchParams}) => {
const filters = await searchParams; 



    const data = await getUsers(filters.page);
  const users = data.users;


const page = data.currentPage || 1
const totalData = users.length
const size = data.size



  return ( <div className='w-full'>
    <UserPageClient 
    users={users}  
    totalData={totalData} 
    currentPage={parseInt(page)} 
    size={parseInt(size)} />
  </div>);
};

export default page;