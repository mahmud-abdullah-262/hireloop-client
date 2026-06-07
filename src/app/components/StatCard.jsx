import { getAllJobs } from "@/lib/api/fetchFunctions";
import {
  Briefcase,
  Persons,
  Thunderbolt,
  CircleCheck,
} from "@gravity-ui/icons";
import { Card } from "@heroui/react";

const stats = [
  {
    icon: Briefcase,
    label: "Total Job Posts",
  },
  {
    icon: Persons,
    label: "Total Applicants",
  },
  {
    icon: Thunderbolt,
    label: "Active Jobs",
  },
  {
    icon: CircleCheck,
    label: "Jobs Closed",
  },
];

export async function StatCard() {
  
  const jobRes = await getAllJobs()

  const candidates = await fetch("http://localhost:5000/candidates");
  const candidatesRes= await candidates.json();

  const values = [
    jobRes.length,
    candidatesRes.length,
    jobRes.filter((j) => j.status === "Open").length,
    jobRes.filter((j) => j.status === "Closed").length,
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 ">
      {stats.map(({ icon: Icon, label }, i) => (
        <Card key={label} className="flex flex-col gap-3 p-4">
          <div className="flex items-start justify-start rounded-lg bg-default-100">
            <Icon className="size-5 text-default-500" />
          </div>
          <div>
            <p className="text-xs text-default-500">{label}</p>
            <p className="text-2xl font-medium">
              {values[i].toLocaleString()}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}