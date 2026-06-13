"use client";

import { useState } from "react";
import {BriefcaseFill} from '@gravity-ui/icons';
import { Separator } from "@heroui/react";
export default function Banner() {
  const [jobInput, setJobInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log("Searching for:", { jobInput, locationInput });
  };

  return (
    <section className="relative w-full bg-[#050505] text-white overflow-hidden py-24 px-6 flex flex-col items-center justify-center min-h-[80vh]">
      
      {/* Background Radial Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-62.5 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Top Mini Badge */}
        <div className="relative">
          <div className="inline-flex items-center space-x-2 bg-[#141414]/90 border border-zinc-800/60 rounded-full px-4 py-1.5 shadow-xl backdrop-blur-md mb-8 animate-fadeIn">
          <span className="text-base"><BriefcaseFill/></span>
          <p className="text-xs font-semibold tracking-wider text-zinc-400">
            <span className="text-white font-bold font-mono">50,000+</span> NEW JOBS THIS MONTH
          </p>
        </div>
  
        </div>
        
      
        {/* Main Heading Text */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 max-w-2xl leading-[1.15]">
          Find Your <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">Dream Job</span> Today
        </h1>

        {/* Subtitle Paragraph */}
        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl font-light leading-relaxed mb-12">
          HireLoop connects top talent with world-class companies. Browse thousands of
          curated opportunities and land your next role — faster.
        </p>

        {/* Compound Search Bar Wrapper */}
        <form 
          onSubmit={handleSearch}
          className="w-full max-w-3xl bg-[#111111]/90 border border-zinc-800 rounded-md  p-1 flex flex-col md:flex-row items-center space-y-3 md:space-y-0 shadow-2xl backdrop-blur-md"
        >
          {/* Input 1: Job title, skill or company */}
          <div className="w-full flex items-center px-3 space-x-3 border-b border-zinc-800 md:border-b-0 md:border-r border-zinc-800/80 pb-3 md:pb-0">
            <svg className="h-5 w-5 text-zinc-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Job title, skill or company"
              value={jobInput}
              onChange={(e) => setJobInput(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
            />
          </div>

          {/* Input 2: Location or Remote */}
          <div className="w-full flex items-center px-4 space-x-3 pt-1 md:pt-0 pb-2 md:pb-0">
            <svg className="h-5 w-5 text-zinc-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              placeholder="Location or Remote"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
            />
          </div>

          {/* Submit Search Button */}
          <button
            type="submit"
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white p-3.5 m-1 rounded-md flex items-center justify-center transition-all shadow-lg shadow-indigo-600/20 active:scale-95 cursor-pointer"
            aria-label="Search"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        {/* Bottom Trending Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-zinc-500">
          <span className="font-medium">Trending Position:</span>
          
          <button type="button" className="bg-[#161616] border border-zinc-800 hover:border-zinc-700 hover:text-white px-3.5 py-1.5 rounded-full transition-colors text-xs text-zinc-300">
            Product Designer
          </button>
          
          <button type="button" className="bg-[#161616] border border-zinc-800 hover:border-zinc-700 hover:text-white px-3.5 py-1.5 rounded-full transition-colors text-xs text-zinc-300">
            AI Engineering
          </button>
          
          <button type="button" className="bg-[#161616] border border-zinc-800 hover:border-zinc-700 hover:text-white px-3.5 py-1.5 rounded-full transition-colors text-xs text-zinc-300">
            Dev-ops Engineer
          </button>
        </div>

      </div>


       
    </section>
  );
}