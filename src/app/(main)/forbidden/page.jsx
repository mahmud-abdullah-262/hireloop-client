"use client";

import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">

        {/* Error Code */}
        <p className="text-sm font-mono tracking-widest text-red-500 uppercase mb-4">
          Error 403
        </p>

        {/* Big Number */}
        <h1 className="text-8xl sm:text-9xl font-bold text-neutral-800 select-none mb-2">
          403
        </h1>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold text-neutral-100 mb-3">
          Access Forbidden
        </h2>

        {/* Description */}
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8">
          You can not visit this page.
          <br />
        Log into right account, or contact to administrator.
        </p>

        {/* Divider */}
        <div className="w-12 h-px bg-neutral-700 mx-auto mb-8" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-sm font-medium rounded-lg transition-colors"
          >
            Home
          </Link>
          <Link
            href="/login"
            className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}