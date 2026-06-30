import CompanyTable from '@/app/components/CompanyTable';


import { getCompany } from '@/lib/api/fetchFunctions';
import React from 'react';

const AdminCompanyPage = async () => {
  const data = await getCompany()

  const {totalCompany} =  data
  //  console.log(result, 'result form company page')
  return (
    <div className='w-full p-4 space-y-2'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>All Companies </h1>
      <p className='text-sm text-white/50'>Found {totalCompany.length} Companies</p>
      <CompanyTable data={totalCompany}></CompanyTable>
    </div>
  );
};

export default AdminCompanyPage;