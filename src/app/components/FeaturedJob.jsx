import React from 'react';
import JobsClient from './JobsClient';
import { getAllJobs } from '@/lib/api/fetchFunctions';
import JobCard from './JobCard';
import Link from 'next/link';
import { MapPin, Briefcase, Coins, ArrowRight } from "lucide-react";


const FeaturedJob = async () => {
  const data = await getAllJobs(); // সার্ভার থেকে জব ডেটা আনা হলো
  const {totalJobs} =  data
  const jobs = totalJobs.slice(0, 6); // প্রথম ৬টা নিলাম

  return (
    <section className="bg-black px-4 py-20">
      <div className="mx-auto max-w-6xl">
        {/* --- Header --- */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rotate-45 bg-violet-500" />
            <span className="text-xs font-medium uppercase tracking-widest text-violet-400">
              Smart Job Discovery
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-violet-500" />
          </div>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            The roles you&apos;d never <br /> find by searching
          </h2>
        </div>

        {/* --- Job Grid --- */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>

        {/* --- View all button --- */}
        <div className="mt-10 text-center">
          <Link
            href="/jobs"
            className="inline-block rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:bg-gray-200"
          >
            View all job open
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJob;