

import { CandidateTable } from "@/app/components/CandidateTable";
import { StatCard } from "@/app/components/StatCard";
import { TopCompanyCard } from "@/app/components/TopCompanyCard";
import { auth } from "@/lib/auth";
import { useSession } from "@/lib/auth-client";
import { getSessionData } from "@/lib/session/getSession";
import { Spinner } from "@heroui/react";
import { headers } from "next/headers";

const RecruiterPage = async () => {
  
 const user = getSessionData()
  // console.log(user, 'user');


  return (
    <div className="p-4 flex flex-col gap-4 w-full">
      <h1 className="font-bold text-2xl text-white">Welcome Back {user?.name}!</h1>
      <StatCard/>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
         <CandidateTable/> 
        </div>
        <div>
          <TopCompanyCard/>
        </div>
      </div>
    </div>
  );
};

export default RecruiterPage;