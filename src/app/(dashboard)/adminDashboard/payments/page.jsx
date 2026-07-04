import React from 'react';
import PaymentTable from './PaymentTable';
import { subscriptionsByAdmin } from '@/lib/api/fetchFunctions';

const page = async ({searchParams}) => {
   const filters = await searchParams; 

   const urlSearch = new URLSearchParams(filters) // সেই ফিল্টারকে সার্চ অবজেক্টে কনভার্ট করা
  
   const searchString = urlSearch.toString() // সার্ভারে কুয়েরি করার উপযুক্ত ভাবে স্ট্রিং বানানো 
    const data = await subscriptionsByAdmin(searchString)
  const {total, result, size, page} = data

   
console.log(total, 'totalData', result, 'result', size, 'size', page, 'page')
 
 


  return (
    <div className='w-full'>
      {/* <PaymentTable subscriptions={result} page={parseInt(page)} totalData={total} size={size} /> */}
    </div>
  );
};

export default page;