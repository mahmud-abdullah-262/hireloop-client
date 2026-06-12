import CompanyTable from '@/app/components/CompanyTable';


import { getCompany } from '@/lib/api/fetchFunctions';
import React from 'react';

const AdminCompanyPage = async () => {
  const result = await getCompany()
  const companies = Array.from(result)
  console.log(companies, 'companies data')
  return (
    <div className='w-full p-4 space-y-2'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>All Companies </h1>
      <p className='text-sm text-white/50'>Found {companies.length} Companies</p>
      <CompanyTable data={companies}></CompanyTable>
    </div>
  );
};

export default AdminCompanyPage;