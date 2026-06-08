"use client";

import { Card, Button, Chip } from "@heroui/react";
import {
  Briefcase,
  Tag,
  MapPin,
  Clock,
  Calendar,
  CalendarXmark,
  CircleCheck,
  MapPinMinus,
  PaperPlane,
} from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";



function splitToList(text) {
  return text.split(".").map((s) => s.trim()).filter(Boolean);
}

function formatSalary(min, max, currency) {
  const fmt = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(Number(n));
  return `${fmt(min)} – ${fmt(max)}`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function JobDetailCard({job}) {
 

  return (
    <Card className="bg-[#0f0f11] my-4 rounded-2xl overflow-hidden w-11/12 mx-auto">

      {/* Header */}
      <Card.Header className="flex items-start gap-4 px-6 pt-6 pb-4 border-b border-[#1e1e22]">
        {/* Logo */}
        <div className="w-14 h-14 rounded-xl bg-white border border-[#2a2a2e] flex items-center justify-center flex-shrink-0 overflow-hidden">
          <Image
            src={job.logoUrl}
            alt={`${job.company} logo`}
            width={50}
            height={50}
            className="w-9 h-9 object-contain"
          />
        </div>

        {/* Title & Badges */}
        <div className="flex-1">
          <Card.Title className="text-xl font-semibold text-[#f0eff4] leading-snug">
            {job.title}
          </Card.Title>
          <Card.Description className="text-sm text-[#7a7a8a] mt-1 flex items-center gap-2">
            <span className="capitalize">{job.company}</span>
            <span className="w-1 h-1 rounded-full bg-[#3e3e4a]" />
            <span>
              {job.city}, {job.country}
            </span>
          </Card.Description>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-3">
            <Chip
              size="sm"
              startContent={<Briefcase className="w-3.5 h-3.5" />}
              className="bg-[#0e1f38] text-[#5b9cf6] border border-[#1a3055] text-xs"
            >
              {job.type}
            </Chip>
            <Chip
              size="sm"
              startContent={<Tag className="w-3.5 h-3.5" />}
              className="bg-[#281e0a] text-[#e8a838] border border-[#3d2e10] text-xs"
            >
              {job.category}
            </Chip>
            <Chip
              size="sm"
              startContent={<MapPinMinus className="w-3.5 h-3.5" />}
              className="bg-[#1a1a1f] text-[#8888a0] border border-[#2a2a35] text-xs"
            >
              {job.isRemote ? "Remote" : "On-site"}
            </Chip>
            <Chip
              size="sm"
              startContent={<CircleCheck className="w-3.5 h-3.5" />}
              className="bg-[#0e2218] text-[#4dbe8c] border border-[#1a3d2a] text-xs capitalize"
            >
              {job.status}
            </Chip>
          </div>
        </div>
      </Card.Header>

      {/* Meta Grid */}
      <Card.Content className="p-0">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-[#1a1a1e] border-b border-[#1a1a1e]">
          <div className="px-5 py-4 flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-[#55556a] font-medium">
              Salary Range
            </span>
            <span className="text-sm font-semibold text-[#4dbe8c]">
              {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
            </span>
          </div>
          <div className="px-5 py-4 flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-[#55556a] font-medium">
              Location
            </span>
            <span className="text-sm text-[#c8c8d8] font-medium flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#55556a]" />
              {job.city}, {job.country}
            </span>
          </div>
          <div className="px-5 py-4 flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-[#55556a] font-medium">
              Job Type
            </span>
            <span className="text-sm text-[#c8c8d8] font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#55556a]" />
              {job.type}
            </span>
          </div>
          <div className="px-5 py-4 flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-[#55556a] font-medium">
              Deadline
            </span>
            <span className="text-sm font-medium text-[#e8a838] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(job.deadline)}
            </span>
          </div>
        </div>

        {/* Body Sections */}
        <div className="px-6 py-5 flex flex-col gap-6">
          {/* Responsibilities */}
          <Section title="Responsibilities" items={splitToList(job.responsibilities)} />

          {/* Requirements */}
          <Section title="Requirements" items={splitToList(job.requirements)} />

          {/* Benefits */}
          <Section title="Benefits" items={splitToList(job.benefits)} />
        </div>
      </Card.Content>

      {/* Footer */}
      <Card.Footer className="px-6 py-4 bg-[#0a0a0c] border-t border-[#1a1a1e] flex justify-between items-center flex-wrap gap-3">
        <div>
          <p className="text-xs text-[#55556a] flex items-center gap-1.5">
            <CalendarXmark className="w-3.5 h-3.5" />
            Apply before{" "}
            <span className="text-[#e8a838]">{formatDate(job.deadline)}</span>
          </p>
          <p className="text-[11px] text-[#3e3e50] mt-1">
            Posted {formatDate(job.postedAt)}
          </p>
        </div>

        <Link
          href={`/jobs/${job._id}/apply`}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg flex items-center gap-2"
          startContent={<PaperPlane className="w-4 h-4" />}
        >
          Apply Now
        </Link>
      </Card.Footer>
    </Card>
  );
}

function Section({ title, items }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] uppercase tracking-widest text-[#55556a] font-semibold">
          {title}
        </span>
        <span className="flex-1 h-px bg-[#1e1e24]" />
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-[#9898ae] leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3a3a4e] mt-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}