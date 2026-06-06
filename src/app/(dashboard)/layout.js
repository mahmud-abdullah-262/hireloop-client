import { getSessionData } from "@/lib/session/getSession";
import { DashboardLayout } from "../components/DashboardLayout";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
   const user = getSessionData()
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
