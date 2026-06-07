
import JobsClient from '@/app/components/JobsClient';
import { getAllJobs } from '@/lib/api/fetchFunctions';


const page = async () => {
  const jobData = await getAllJobs();
  return <JobsClient jobs={jobData} />;
};

export default page;