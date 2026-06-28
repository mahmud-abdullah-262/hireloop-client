import { ArrowRight, CircleCheckFill, Magnifier, MapPin, Persons, Tag } from '@gravity-ui/icons';

export const CompanyCard = ({ company }) => {
  return (
    <div className="relative flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-5">
      {company.verified && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-black">
          <CircleCheckFill className="size-3" />
          Verified
        </span>
      )}

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900">
        {company.logoUrl ? (
          <img
            src={company.logoUrl}
            alt={company.companyName}
            className="h-6 w-6 object-contain"
          />
        ) : (
          <span className="text-sm font-semibold text-white">
            {company.companyName.charAt(0)}
          </span>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-white">{company.companyName}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
          {company.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-500">
        {company.category && (
          <span className="flex items-center gap-1">
            <Tag className="size-3.5 text-emerald-500" />
            <span className="capitalize">{company.category}</span>
          </span>
        )}
        {company.employeeCount && (
          <span className="flex items-center gap-1">
            <Persons className="size-3.5 text-emerald-500" />
            {company.employeeCount} Employees
          </span>
        )}
        {company.location && (
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5 text-emerald-500" />
            {company.location}
          </span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-zinc-800 pt-3 text-xs">
        <span className="text-zinc-500">{company.activeJobs} Active Jobs</span>
        <button
          type="button"
          className="flex items-center gap-1 font-medium text-zinc-200 hover:text-emerald-400"
        >
          View Openings
          <ArrowRight className="size-3" />
        </button>
      </div>
    </div>
  );
};