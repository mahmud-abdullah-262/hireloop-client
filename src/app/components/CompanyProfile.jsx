import CompanyProfileClient from "./CompanyProfileClient";


const CompanyProfile = async ({ companyData }) => {
  const company = await companyData;
  return <CompanyProfileClient company={company} />;
};

export default CompanyProfile;