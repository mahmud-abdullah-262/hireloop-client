"use client";
import {Briefcase, House, PersonMagnifier, Star} from '@gravity-ui/icons';

export default function Stats() {
  const stats = [
    { id: 1, icon: <Briefcase/>, value: "50K", label: "Active Jobs" },
    { id: 2, icon: <House/>, value: "12K", label: "Companies" },
    { id: 3, icon: <PersonMagnifier/>, value: "2M", label: "Job Seekers" },
    { id: 4, icon: <Star/>, value: "97%", label: "Satisfaction Rate" },
  ];

  return (
    <section className="relative w-full bg-[#050505] text-white py-24 px-6 overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background Atmosphere & Globe Image Wrapper */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        {/* Glow behind the globe */}
        <div className="absolute bottom-[-10%] w-[600px] sm:w-[800px] md:w-[1000px] h-[400px] bg-indigo-600/30 blur-[130px] rounded-full" />
        
        {/* Your Provided Globe Image */}
        <div 
          className="absolute top-[10%] w-[1200px] h-[600px] opacity-40 bg-cover bg-center bg-no-repeat mask-image"
          style={{ backgroundImage: "url('./images/globe.png')" }}
        />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center">
        
        {/* Section Heading Statement */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-wide text-zinc-300 text-center max-w-2xl leading-relaxed mb-16 px-4">
          Assisting over <span className="text-white font-semibold">15,000 job seekers</span> <br className="hidden sm:inline" />
          find their dream positions.
        </h2>

        {/* Metrics Display Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-[#0D0D0D]/80 border border-zinc-900 rounded-2xl p-6 flex flex-col items-start space-y-4 backdrop-blur-md shadow-2xl hover:border-zinc-800 transition-all duration-300 group"
            >
              {/* Icon Container */}
              <div className="text-lg bg-zinc-900/60 w-9 h-9 flex items-center justify-center rounded-xl border border-zinc-800/80 text-zinc-400 group-hover:text-white transition-colors">
                {stat.icon}
              </div>

              {/* Numerical Value and Label text */}
              <div className="flex flex-col space-y-1">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
                  {stat.value}
                </span>
                <span className="text-xs font-medium text-zinc-500 tracking-wide uppercase">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}