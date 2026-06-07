// RecruiterAllJob.jsx (Server Component)
import JobsTable from '@/app/components/JobsTable';
import { getCompanyJobs, getLoggedInRecruiterCompany } from '@/lib/api/fetchFunctions';
import { Button } from '@heroui/react';
import { ObjectId } from 'mongodb';
import Link from 'next/link';


const RecruiterAllJob = async () => {
  const recruiterCompany = await getLoggedInRecruiterCompany()
  if(!recruiterCompany){
    return(
      <div className='flex flex-col gap-4 items-center justify-center py-20 mx-auto'>
        <p className='text-gray-500'>
        No Job Create in Your Account. First Create a Company then Create a job!
        </p>
        <div className='flex flex-col md:flex-row gap-2'>
           <Link href={'/recruiterdashboard/recruitercompany'}>
           <Button>Create A Company</Button>
          </Link>
        <Link href={'/recruiterdashboard/new'}>
           <Button>Create A job If you have a company</Button>
          </Link>
        </div>
      </div>
    )
  }
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