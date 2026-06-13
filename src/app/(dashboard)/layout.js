import { getSessionData } from "@/lib/session/getSession";
import { DashboardLayout } from "../components/DashboardLayout";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { redirect } from "next/navigation";

export default async function MainLayout({ children }) {
   const user = await getSessionData() || null
  //  console.log(user, 'user from layout')
  
  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar user={user} />
      <div className='flex flex-col md:flex-row min-h-screen'>
        <DashboardLayout user={user} className="flex-1" />
        {children}
      </div>

      <Footer />
    </div>
  );
}
