
import { getApplicationsByApplicantId } from "@/lib/api/fetchFunctions";
import { getSessionData } from "@/lib/session/getSession";
import {
  Briefcase,
  Persons,
  Thunderbolt,
  CircleCheck,
} from "@gravity-ui/icons";
import { Card } from "@heroui/react";

export async function SeekerStatCard() {
  const user = await getSessionData();
  const applications = await getApplicationsByApplicantId(user.id);
  // console.log(user, 'seeker user')
  const total = applications.length;
  const shortlisted = applications.filter((a) => a.status === "Shortlisted").length;
  const interviews = applications.filter((a) => a.status === "Interview").length;
  const successRate =
    total > 0 ? Math.round((shortlisted / total) * 100) : 0;

  const stats = [
    {
      icon: Briefcase,
      label: "Total Applied",
      value: total,
      valueClass: "text-foreground",
    },
    {
      icon: Persons,
      label: "Shortlisted",
      value: shortlisted,
      valueClass: "text-foreground",
    },
    {
      icon: Thunderbolt,
      label: "Interviews",
      value: interviews,
      valueClass: "text-warning",
    },
    {
      icon: CircleCheck,
      label: "Success Rate",
      value: `${successRate}%`,
      valueClass: "text-success",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map(({ icon: Icon, label, value, valueClass }) => (
        <Card key={label} className="flex flex-col gap-3 p-4">
          <div className="flex items-start justify-start">
            <Icon className="size-5 text-default-500" />
          </div>
          <div>
            <p className="text-xs text-default-500">{label}</p>
            <p className={`text-2xl font-medium ${valueClass}`}>
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}