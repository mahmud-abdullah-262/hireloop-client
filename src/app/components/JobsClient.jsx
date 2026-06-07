"use client";

import { useState, useMemo } from "react";
import {
  InputGroup,
  TextField,
  Label,
  Select,
  ListBox,
} from "@heroui/react";
import JobCard from "./JobCard";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const WORK_MODES = ["Remote", "On-site"];

export default function JobsClient({ jobs }) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = useMemo(
    () => [...new Set(jobs.map((j) => j.category).filter(Boolean))],
    [jobs]
  );

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      if (search && !job.title.toLowerCase().includes(search.toLowerCase()))
        return false;

      if (selectedCategory && job.category !== selectedCategory)
        return false;

      if (selectedType && job.type !== selectedType)
        return false;

      if (selectedMode) {
        const mode = job.isRemote
          ? "Remote"
          : "On-site";
        if (mode !== selectedMode) return false;
      }

      return true;
    });
  }, [jobs, search, selectedCategory, selectedType, selectedMode]);

  const hasActiveFilter = search || selectedCategory || selectedType || selectedMode;

  const handleReset = () => {
    setSearch("");
    setSelectedCategory(null);
    setSelectedType(null);
    setSelectedMode(null);
  };

  return (
    <div className="w-11/12 mx-auto py-8 space-y-6">
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">Available Jobs</h1>
        <p className="text-xs md:text-sm lg:text-md font-medium text-white/70">Get Your Favorite Job</p>
      </div>
      {/* Filter Bar */}
      <div className=" flex flex-col md:flex-row gap-3">

        {/* Search Input */}
        <TextField className="md:max-w-xs w-full">
          <Label className="text-xs text-white/40 mb-1">Search</Label>
          <InputGroup>
            <InputGroup.Prefix className="pl-3 text-white/40">
              <svg
                width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </InputGroup.Prefix>
            <InputGroup.Input
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#1a1a1f] text-white/80 placeholder:text-white/30 rounded-2xl"
            />
          </InputGroup>
        </TextField>

        {/* Category Select */}
        <Select
          className="md:max-w-[160px] w-full"
          placeholder="Category"
          selectedKey={selectedCategory}
          onSelectionChange={(key) => setSelectedCategory(key || null)}
        >
          <Label className="text-xs text-white/40 mb-1">Category</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {categories.map((cat) => (
                <ListBox.Item key={cat} id={cat} textValue={cat}>
                  {cat}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Job Type Select */}
        <Select
          className="md:max-w-[160px] w-full"
          placeholder="Job Type"
          selectedKey={selectedType}
          onSelectionChange={(key) => setSelectedType(key || null)}
        >
          <Label className="text-xs text-white/40 mb-1">Type</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {JOB_TYPES.map((t) => (
                <ListBox.Item key={t} id={t} textValue={t}>
                  {t}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Work Mode Select */}
        <Select
          className="md:max-w-[160px] w-full"
          placeholder="Work Mode"
          selectedKey={selectedMode}
          onSelectionChange={(key) => setSelectedMode(key || null)}
        >
          <Label className="text-xs text-white/40 mb-1">Mode</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {WORK_MODES.map((m) => (
                <ListBox.Item key={m} id={m} textValue={m}>
                  {m}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Reset Button */}
        {hasActiveFilter && (
          <button
            onClick={handleReset}
            className="text-sm text-white/40 hover:text-white/70 transition-colors px-2 pb-1 shrink-0"
          >
            Reset
          </button>
        )}
      </div>

      {/* Result Count */}
      <p className="text-xs text-white/30">
        {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* Job Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-white/30 text-sm">
          No jobs match your filters.
        </div>
      )}
    </div>
  );
}