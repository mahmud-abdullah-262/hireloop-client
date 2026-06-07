"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Image from "next/image";



export default  function Navbar({user}) {
  const [isOpen, setIsOpen] = useState(false);

  console.log(user, 'user');
  
  //  const { data: session, isPending } =  authClient.useSession();
  // const user = session?.user
  return (
    <nav className="w-full bg-[#111111] text-[#E5E5E5] px-6 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Logo */}
        <div className="flex items-center cursor-pointer">
          {/* Mock Logo Icon matching Programming Hero style */}
          <Link href={'/'}>
          <Image
          src={'/images/logow.svg'}
          width={300}
          height={100}
          alt=" Logo"
          className="w-36 h-24"
          />

          
          </Link>
          </div>
         
      

        {/* Center/Right: Desktop Navigation Capsule */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Main Links Capsule */}
          <div className="bg-[#1A1A1A] border border-zinc-800/80 rounded-md px-6 py-2 flex items-center space-x-6 text-sm font-medium text-zinc-300">
            <Link href="/jobs" className="hover:text-white transition-colors">Browse Jobs</Link>
            <Link href="#" className="hover:text-white transition-colors">Companies</Link>
            <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
          </div>

          {/* Divider */}
          <span className="text-zinc-700 font-light">|</span>

          {/* Auth Action Buttons */}
          <div className="flex items-center space-x-4 text-sm font-medium">
            {user ? 
            <>
             <Link 
             onClick={async() => await authClient.signOut()} 
             href="/signin" className="text-indigo-400 hover:text-indigo-300 transition-colors px-2">
             Logout
            </Link>
            <Link href="/profile" className="bg-white text-black hover:bg-zinc-200 transition-all font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-white/5">
              Profile
            </Link>
            </>
            : 
            <>
             <Link href="/signin" className="text-indigo-400 hover:text-indigo-300 transition-colors px-2">
              Sign In
            </Link>
            <Link href="/signup" className="bg-white text-black hover:bg-zinc-200 transition-all font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-white/5">
              Get Started
            </Link>
            </>
            }
           
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
{isOpen && (
  <div className="md:hidden mt-4 bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-4 flex flex-col space-y-4 text-sm font-medium text-zinc-300">
    <Link href="/jobs" onClick={() => setIsOpen(false)} className="hover:text-white py-1 border-b border-zinc-800/50">Browse Jobs</Link>
    <Link href="#" onClick={() => setIsOpen(false)} className="hover:text-white py-1 border-b border-zinc-800/50">Company</Link>
    <Link href="#" onClick={() => setIsOpen(false)} className="hover:text-white py-1">Pricing</Link>
    
    <div className="flex items-center space-x-4 text-sm font-medium">
      {user ? 
        <>
          <Link 
            onClick={async() => { await authClient.signOut(); setIsOpen(false); }} 
            href="/signin" className="text-indigo-400 hover:text-indigo-300 transition-colors px-2">
            Logout
          </Link>
          <Link href="/profile" onClick={() => setIsOpen(false)} className="bg-white text-black hover:bg-zinc-200 transition-all font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-white/5">
            Profile
          </Link>
        </>
        : 
        <>
          <Link href="/signin" onClick={() => setIsOpen(false)} className="text-indigo-400 hover:text-indigo-300 transition-colors px-2">
            Sign In
          </Link>
          <Link href="/signup" onClick={() => setIsOpen(false)} className="bg-white text-black hover:bg-zinc-200 transition-all font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-white/5">
            Get Started
          </Link>
        </>
      }
    </div>
  </div>
)}
    </nav>
  );
}