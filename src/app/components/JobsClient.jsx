"use client";

import { useState, useMemo, useEffect } from "react";
import {
  InputGroup,
  TextField,
  Label,
  Select,
  ListBox,
} from "@heroui/react";
import JobCard from "./JobCard";
import { useRouter } from "next/navigation";
import { Pagination } from '@heroui/react';

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const WORK_MODES = ["Remote", "On-site"];
const categories = [ "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "Human Resources",
  "Operations",
  "Customer Support",
  "Product",
  "Legal",
  "Other",]

// ফিল্টার মেথডের ক্লায়েন্ট পার্ট -
export default function JobsClient({ jobs, filters }) { // ক্লায়েন্ট সাইডে সার্চ প্যারামস নিয়ে আসা এবং এরেটা পাস করা
  console.log('filters', filters)
  const router = useRouter() // রাউটার পুশ করার দরকার হবে







  const [search, setSearch] = useState(filters.search); // স্টেটের মধ্যে সার্চ ইনপুট রাখছি, ডিফল্টভাবে সার্চ প্যারামস থেকে আসা ডাটা নিচ্ছি, যেন রিলোড/শেয়ার করার সময় সার্চ এলিমেন্টগুলো হারিয়ে না যায়।
  const [selectedType, setSelectedType] = useState(filters.jobType);
  const [selectedMode, setSelectedMode] = useState(filters.jobMode);
  console.log(selectedMode, "selectedMode")
  const [selectedCategory, setSelectedCategory] = useState(filters.jobCategory);


  
 

// ইউজ এফেক্ট ব্যবহার করে সার্চ/ফিল্টার চেঞ্জ হওয়া মাত্রই আবার সার্ভারে কল করা হবে।
 useEffect(()=>{
  const sp = new URLSearchParams() // ব্রাউজারের সার্চবারে কুয়েরি প্যারামিটার সেট করার জন্য, যেন সার্ভারসাইডে কাজ করা যায় এবং লিঙ্ক শেয়ার করা যায়, যেখানে সমস্ত প্যারামিটার থাকবে।
  if(search){
    sp.set('title', search) // ব্রাউজারের সার্চ বক্সে সেট করার জন্য .set মেথড ইউজ করা হয়, প্রথম প্যারামিটারে কুয়েরির কিওয়ার্ড দিতে হয়, পরের প্যারামিটারে স্টেটটা। একাধিক কুয়েরি সেট করা যায়, যেমনটা নিচে করা হয়েছে।
  }
  if(selectedCategory){
    sp.set('category',selectedCategory ); // এখানে যে ডাটাবেজ থেকে ফিল্টার করা হবে সেই ডাটাবেজের কী অনুযায়ী প্রথম প্যারামিটার দিতে হবে। 
  }
  if(selectedType){
      sp.set('type', selectedType)
  }
 
  if(selectedMode){
 if(selectedMode == "Remote"){
      sp.set('isRemote', true);
  } else{
    sp.set('isRemote', false)
  }
  }




  const path = `?${sp.toString()}` // একটা প্যাথ বানাতে হয় ব্রাউজারের সার্চ বক্সে শো করার জন্য এবং ব্যাকেন্ডে কুয়েরি করার জন্য। যেহেতু কুয়েরি হবে এজন্য শুরুতে ? চিহ্ন দিতে হয়, এবং স্ট্রিং আকারে যাবে তাই toString() মেথড ব্যবহার করা হয়।
  router.push(path) // সেই প্যাথ ব্রাউজারের সার্চ বক্সে পুশ করে দেয়া হল
 },[search, selectedType, router, selectedCategory, selectedMode]) // যা যা ব্যবহার করা হচ্ছে, ইউজ এফেক্ট সবকিছু ডিপেন্ডেন্সি এরেতে রেখে অবজার্ভ করে, কোনটায় চেঞ্জ আসলে আবার সার্ভারে কল করে।

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
        {jobs.length} job{jobs.length !== 1 ? "s" : ""} found
      </p>

      {/* Job Grid */}
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
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