// RecruiterAllJob.jsx (Server Component)
import JobsTable from '@/app/components/JobsTable';
import { getCompanyJobs } from '@/lib/api/getJobs';
import { Button } from '@heroui/react';
import Link from 'next/link';


const RecruiterAllJob = async () => {
  const companyId = 1234567890;
  const jobs = await getCompanyJobs(companyId);
 
  return (
    <div className="p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">All Job Postings</h1>
        <Link href={'/recruiterdashboard/new'}>
        <Button color="primary" size="sm">+ Post New Job</Button>
        </Link>
        
      </div>
      <JobsTable jobs={jobs} />
    </div>
  );
};

export default RecruiterAllJob;