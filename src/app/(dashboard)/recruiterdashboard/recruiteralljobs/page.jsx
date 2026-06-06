// RecruiterAllJob.jsx (Server Component)
import JobsTable from '@/app/components/JobsTable';
import { getCompanyJobs, getLoggedInRecruiterCompany } from '@/lib/api/fetchFunctions';
import { Button } from '@heroui/react';
import { ObjectId } from 'mongodb';
import Link from 'next/link';


const RecruiterAllJob = async () => {
  const recruiterCompany = await getLoggedInRecruiterCompany()
  const companyId = new ObjectId(recruiterCompany._id);
  const jobs = await getCompanyJobs(companyId);
  console.log(jobs, 'data form job table')
 
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