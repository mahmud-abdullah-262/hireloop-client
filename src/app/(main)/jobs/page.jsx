
import JobsClient from '@/app/components/JobsClient';
import { getAllJobs } from '@/lib/api/fetchFunctions';


const page = async () => {
  const jobData = await getAllJobs();
  console.log(jobData, 'jobdata')
  return <JobsClient jobs={jobData} />;
};

export default page;