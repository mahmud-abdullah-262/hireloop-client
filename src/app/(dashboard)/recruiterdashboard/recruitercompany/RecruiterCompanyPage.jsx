


import { Factory, Plus } from '@gravity-ui/icons';
import { Button, Badge, Card, Divider, Avatar } from '@heroui/react';
import CompanyProfile from '@/app/components/CompanyProfile';
import { RegisterCompany } from '@/app/components/RegisterCompany';
import { getRecruiterCompany } from '@/lib/api/fetchFunctions';


// const MOCK_COMPANY = {
//   name: "Acme Corp",
//   website: "https://acmecorp.com",
//   industry: "Technology",
//   location: "Dhaka, Bangladesh",
//   approved: true,
//   companyId: "1234567890",
// };

// সেশন ডাটা দিয়ে রিপ্লেস করার জন্য এখানে null করুন
// const SESSION_COMPANY = MOCK_COMPANY ; // null করলে empty state দেখাবে

const InfoRow = ({ icon: Icon, label, value, isLink }) => (
  <div className="flex items-start gap-3 py-3">
    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 shrink-0 mt-0.5">
      <Icon className="text-white/50" width={18} height={18} />
    </div>
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-xs font-medium text-white/40 uppercase tracking-widest">{label}</span>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors truncate"
        >
          {value}
        </a>
      ) : (
        <span className="text-sm text-white/90 font-medium">{value}</span>
      )}
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 px-4">
    <div className="relative">
      <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
        <Factory className="text-white/20" width={40} height={40} />
      </div>
      <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
        <Plus className="text-white/40" width={14} height={14} />
      </div>
    </div>

    <div className="text-center space-y-2 max-w-xs">
      <h2 className="text-xl font-semibold text-white">No Company Found</h2>
      <p className="text-sm text-white/40 leading-relaxed">
       Your company has not been registered yet. Click the button below to get started.
      </p>
    </div>

  
      <RegisterCompany></RegisterCompany>
  
  </div>
);


const RecruiterCompanyPage = async ({user}) => {
  const userdata = await user
  const recruiterId = userdata.id
const companyData = await getRecruiterCompany(recruiterId)
  console.log(companyData, 'company data')
  const company = companyData.message ? null : companyData;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white w-full">
      {company ? <CompanyProfile companyData={companyData} /> : <EmptyState />}
    </div>
  );
};

export default RecruiterCompanyPage;
