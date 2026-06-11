
import { redirect } from 'next/navigation';
import { Lock } from '@gravity-ui/icons';
import Link from 'next/link';

export default function UnauthorizedPage() {
 

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-5 text-center max-w-sm">
        <div className="w-18 h-18 rounded-full bg-[#1e1e1e] border border-[#333] flex items-center justify-center p-5">
          <Lock className="text-red-400 w-8 h-8" />
        </div>
        <span className="text-xs font-medium tracking-widest text-red-400 uppercase bg-[#1e1e1e] border border-[#2a2a2a] px-3 py-1 rounded-md">
          401 — Unauthorized
        </span>
        <h1 className="text-3xl font-medium text-white">Access denied</h1>
        <div className="w-10 h-px bg-[#2a2a2a]" />
        <p className="text-sm text-neutral-500 leading-relaxed">
          You do not have permission to view this page.<br />
          Please log in or return to the home page.
        </p>
        <Link
          href={'/'}
          className="flex items-center gap-2 px-6 py-2.5 bg-white text-black text-sm font-medium rounded-md hover:bg-neutral-200 active:scale-95 transition-all"
        >
          Go to home
        </Link>
      </div>
    </div>
  );
}