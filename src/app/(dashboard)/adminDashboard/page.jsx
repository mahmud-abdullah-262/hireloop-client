import { getAllJobs, getCompany, getUsers, subscriptionsByAdmin } from '@/lib/api/fetchFunctions';
import { getUserToken } from '@/lib/session/getSession';
import React from 'react';
// Gravity UI Icons (প্রজেক্টে ইনস্টল করা না থাকলে Lucide Icon-ও ব্যবহার করতে পারেন)
import {Person, Persons, Gear, Factory, ChartLineArrowUp } from '@gravity-ui/icons';

const AdminDashBoardPage = async () => {
  const { total, users } = await getUsers();
  const { totalCompany } = await getCompany();
  const { totalJobs } = await getAllJobs();
  const { revenue } = await subscriptionsByAdmin();

  const userCount = total;
  // .map() এর বদলে .filter() ব্যবহার করা হয়েছে সঠিক কাউন্ট পাওয়ার জন্য
  const recruiterCount = users.filter(user => user.role === 'recruiter').length;
  const companyCount = totalCompany.length;
  const jobCount = totalJobs.length;
  const revenueCount = revenue;

  // কার্ডের ডাটা সহজে রেন্ডার করার জন্য একটি অ্যারে তৈরি করে নেওয়া হলো
  const stats = [
    { title: 'Total Users', value: userCount, icon: <Person width={24} height={24} />, desc: 'Registered platform users' },
    { title: 'Recruiters', value: recruiterCount, icon: <Persons width={24} height={24} />, desc: 'Active talent acquisition accounts' },
    { title: 'Companies', value: companyCount, icon: <Factory width={24} height={24} />, desc: 'Registered organizations' },
    { title: 'Total Jobs', value: jobCount, icon: <Gear width={24} height={24} />, desc: 'Live job postings' },
    { title: 'Total Revenue', value: `$${revenueCount}`, icon: <ChartLineArrowUp width={24} height={24} />, desc: 'Earnings from subscriptions' },
  ];

  return (
    <div className='w-11/12 mx-auto p-4 space-y-8'>
      {/* Header Section */}
      <div className='space-y-2'>
        <h1 className='text-white font-bold text-2xl md:text-3xl lg:text-4xl'>Dashboard Overview</h1>
        <p className='text-white/50'>Real-time platform performance and growth metrics.</p>
      </div>

      {/* Stat Cards Section */}
      <div className='grid grid-cols-1  md:grid-cols-3 lg:grid-cols-5  gap-4'>
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className='bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-colors'
          >
            <div className='flex justify-between items-start'>
              <span className='text-zinc-400 font-medium text-sm'>{stat.title}</span>
              <div className='text-zinc-400 bg-zinc-800/50 p-2 rounded-lg border border-zinc-800'>
                {stat.icon}
              </div>
            </div>
            
            <div>
              <h2 className='text-white text-3xl font-bold tracking-tight'>{stat.value}</h2>
              <p className='text-zinc-500 text-xs mt-1'>{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashBoardPage;