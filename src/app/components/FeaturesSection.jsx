import {
  Search,
  LineChart,
  BarChart3,
  Bookmark,
  MousePointerClick,
  FileUser,
  Hexagon,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: LineChart,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: BarChart3,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: MousePointerClick,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
  },
  {
    icon: FileUser,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    icon: Hexagon,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-black px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3">
          <span className="h-1.5 w-1.5 rotate-45 bg-purple-500" />
          <span className="text-xs font-medium tracking-[0.25em] text-neutral-400">
            FEATURES JOB
          </span>
          <span className="h-1.5 w-1.5 rotate-45 bg-purple-500" />
        </div>

        {/* Heading */}
        <h2 className="mx-auto mt-4 max-w-2xl text-center text-3xl font-semibold text-white sm:text-4xl">
          Everything you need to succeed
        </h2>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-neutral-900">
                <Icon className="h-5 w-5 text-purple-400" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
