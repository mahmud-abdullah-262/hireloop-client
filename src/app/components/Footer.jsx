import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] text-[#999999] px-6 pt-16 pb-8 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 pb-12">
          
          {/* Left Column: Brand & Description */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer">
              {/* Logo Matching Hero Style */}
              <div className="h-9 w-9 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-md shadow-purple-500/20">
                {"</>"}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-white text-base tracking-wide">Programming</span>
                <span className="font-semibold text-zinc-400 text-sm">Hero</span>
              </div>
            </div>
            
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Right Columns: Links Sections */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Product Links */}
            <div className="flex flex-col space-y-3 text-sm">
              <h3 className="text-indigo-400 font-semibold tracking-wide mb-1">Product</h3>
              <Link href="#" className="hover:text-white transition-colors">Job discovery</Link>
              <Link href="#" className="hover:text-white transition-colors">Worker AI</Link>
              <Link href="#" className="hover:text-white transition-colors">Companies</Link>
              <Link href="#" className="hover:text-white transition-colors">Salary data</Link>
            </div>

            {/* Navigations Links */}
            <div className="flex flex-col space-y-3 text-sm">
              <h3 className="text-indigo-400 font-semibold tracking-wide mb-1">Navigations</h3>
              <Link href="#" className="hover:text-white transition-colors">Help center</Link>
              <Link href="#" className="hover:text-white transition-colors">Career library</Link>
              <Link href="#" className="hover:text-white transition-colors">Contact</Link>
            </div>

            {/* Resources Links */}
            <div className="flex flex-col space-y-3 text-sm col-span-2 sm:col-span-1">
              <h3 className="text-indigo-400 font-semibold tracking-wide mb-1">Resources</h3>
              <Link href="#" className="hover:text-white transition-colors">Brand Guideline</Link>
              <Link href="#" className="hover:text-white transition-colors">Newsroom</Link>
            </div>

          </div>
        </div>

        {/* Bottom Bar: Socials & Subtext */}
        <div className="border-t border-zinc-900/60 pt-8 flex flex-col space-y-6 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between text-xs text-zinc-600">
          
          {/* Social Icons Container */}
          <div className="flex items-center space-x-3">
            {/* Facebook */}
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-all text-base">
              <span className="font-serif font-bold lowercase">f</span>
            </a>
            {/* Discord/Custom Blue-Purple Icon */}
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-all text-base shadow-lg shadow-indigo-600/10">
              <span>🌐</span>
            </a>
            {/* LinkedIn */}
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-all text-sm font-bold">
              in
            </a>
          </div>

          {/* Copyright & Policy Links */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <span>Copyright 2024 — Programming Hero</span>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-zinc-400 transition-colors">Terms & Policy</Link>
              <span>-</span>
              <Link href="#" className="hover:text-zinc-400 transition-colors">Privacy Guideline</Link>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}