import NextLink from "next/link";
import { Link } from "@heroui/react";

export async function TopCompanyCard() {
  const res = await fetch("http://localhost:5000/jobs");
  const jobs = await res.json();

  const companyMap = {};
  for (const job of jobs) {
    if (!companyMap[job.companyName]) {
      companyMap[job.companyName] = { count: 0, location: job.location };
    }
    companyMap[job.companyName].count++;
  }

  const companies = Object.entries(companyMap)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  return (
    <div className="w-full rounded-xl bg-content1 p-5 border bg-gray-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">My Top Companies</h2>
        <Link href="/alljobs" size="sm" color="foreground" className="text-default-400">
          View all
        </Link>
      </div>

      <div className="flex flex-col divide-y divide-divider rounded-xl">
        {companies.map((company) => {
          const initials = company.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          const [industry, city] = company.location.split(",");

          return (
            <div key={company.name} className="flex items-center gap-4 px-4 py-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-default-100 text-sm font-medium text-default-600">
                {initials}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{company.name}</p>
                <p className="text-xs text-default-400">
                  {industry?.trim()} • {city?.trim()}
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-lg font-medium leading-none">{company.count}</p>
                <p className="text-[10px] text-default-400 uppercase tracking-wide mt-0.5">
                  Active Jobs
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <NextLink
        href="/alljobs"
        className="mt-4 flex w-full items-center justify-center rounded-xl border border-divider py-2.5 text-sm text-default-500 hover:bg-default-100 transition-colors"
      >
        View All Companies
      </NextLink>
    </div>
  );
}