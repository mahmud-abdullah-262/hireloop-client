import AdminJobsClient from '@/app/components/AdminJobsClient';
import { getAllJobs } from '@/lib/api/fetchFunctions';
import React from 'react';

const AdminJobsPage = async ({searchParams}) => {
  const filters = await searchParams; //; ব্রাউজারে যে যে প্যারামিটারে সার্চ/ফিল্টার করছি তা অবজেক্ট আকারে পাব (এর পরের কাজ ক্লায়েন্ট সাইডে করে নিচের ধাপ করতে হবে)
  
   const urlSearch = new URLSearchParams(filters) // সেই ফিল্টারকে সার্চ অবজেক্টে কনভার্ট করা
  
   const searchString = urlSearch.toString() // সার্ভারে কুয়েরি করার উপযুক্ত ভাবে স্ট্রিং বানানো 
  
    console.log(filters, 'search params', "searchString", searchString)
  
  const page = filters.page || 1
   
  
    const data = await getAllJobs(searchString); // সার্চ স্ট্রিংটা সার্ভারে পাঠালাম, বাকি কাজ সার্ভারে 
  
    const {totalJobs, result, size} = data
  return (  <AdminJobsClient filters={filters} jobs={result} page={parseInt(page)} size={size} totalJobs={totalJobs}/>);
};

export default AdminJobsPage;