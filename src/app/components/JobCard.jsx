// components/JobCard.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

const formatSalary = (job) => {
  const { salaryMin, salaryMax, currency } = job;
  const symbols = { USD: "$", EUR: "€", GBP: "£", BDT: "৳" };
  const sym = symbols[currency] || currency;
  const fmt = (n) =>
    Number(n) >= 1000
      ? `${sym}${(Number(n) / 1000).toFixed(0)}k`
      : `${sym}${n}`;
  return `${fmt(salaryMin)}–${fmt(salaryMax)}/yr`;
};

const formatDeadline = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function JobCard({ job }) {
  const workMode = job.isRemote
    ? "Remote"
    : job.workMode === "hybrid"
    ? "Hybrid"
    : "On-site";

  return (
    <div className="bg-[#1a1a1f] border border-white/[0.07] rounded-2xl p-6 flex flex-col gap-3 hover:border-white/[0.15] transition-all duration-200">
      {/* Type & Category */}
      <p className="text-[11px] font-semibold uppercase tracking-wide text-white/40">
        {job.type} · {job.category}
      </p>

      {/* Title */}
      <div className="flex gap-2 items-center justify-start">
        
        <Image
        src={job.logoUrl}
        alt={job.company}
        width={200}
        height={200}
        className="w-10 h-10 object-cover object-center rounded"
        >

        </Image>
        <div>
          <h3 className="text-xl font-semibold text-white/90 leading-snug">
        {job.title}
      </h3>
      <h5 className="text-md font-semibold text-white/90 leading-snug">{job.company}</h5>
        </div>
        
      </div>
      

      {/* Description */}
      <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
        {job.responsibilities}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-1">
        {/* Location */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-white/70">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
          {job.city}, {job.country}
        </span>

        {/* Work Mode */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-white/70">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
          {workMode}
        </span>

        {/* Salary */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-white/70">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
          {formatSalary(job)}
        </span>
      </div>

      {/* Deadline */}
      <p className="text-[11px] text-white/30">
        Deadline: {formatDeadline(job.deadline)}
      </p>

      {/* Apply Link */}
      <Link
        href={`/jobs/${job._id}`}
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white hover:gap-3 transition-all duration-200 pt-1 group"
      >
        Apply Now
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:translate-x-1"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}