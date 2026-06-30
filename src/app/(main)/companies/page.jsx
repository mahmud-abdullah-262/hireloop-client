import { getCompany } from '@/lib/api/fetchFunctions';

import CompanyClient from './CompanyClient';




const CompanyPage = async ({searchParams}) => {
  const filters = await searchParams; 
 
  const urlSearch = new URLSearchParams(filters)
  const searchString = urlSearch.toString()
  
  console.log(filters, 'search params', "searchString", searchString)

  const data = await getCompany(searchString);
  const {result, totalCompany, size} = data
  
  const page = filters.page || 1
  const totalCompanies = totalCompany.length
  const itemsPerPage = size

  return (<CompanyClient currentPage={parseInt(page)} totalData={totalCompanies} size={parseInt(itemsPerPage)} companies={result} filters={filters}/>);
};

export default CompanyPage;