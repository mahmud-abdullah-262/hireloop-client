import { getAllJobs } from "@/lib/api/fetchFunctions";
import {
  Briefcase,
  Persons,
  Thunderbolt,
  CircleXmark,
} from "@gravity-ui/icons";
import { Card } from "@heroui/react";

const stats = [
  {
    icon: Briefcase,
    label: "Total Job Posts",
  },
  
  {
    icon: Thunderbolt,
    label: "Active Jobs",
  },
  {
    icon: CircleXmark,
    label: "Jobs Closed",
  },
];

export async function StatCard() {
  
  const data = await getAllJobs()
  const jobRes = data.totalJobs
  console.log( jobRes.filter((j) => j.status == "active").length, 'active',
    jobRes.filter((j) => j.status == "pending").length, 'pending' )


  const values = [
    jobRes.length,
    jobRes.filter((j) => j.status == "active").length,
    jobRes.filter((j) => j.status == "pending").length,
  ];



  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {stats.map(({ icon: Icon, label }, i) => (
        <Card key={label} className="flex flex-col gap-3 p-4">
          <div className="flex items-start justify-start rounded-lg bg-default-100">
            <Icon className="size-5 text-default-500" />
          </div>
          <div>
            <p className="text-xs text-default-500">{label}</p>
            <p className="text-2xl font-medium">
              {values[i]}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}