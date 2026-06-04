import { DashboardLayout } from "../components/DashboardLayout";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <div className='flex flex-col md:flex-row min-h-screen'>
        <DashboardLayout className="flex-1" />
        {children}
      </div>

      <Footer />
    </div>
  );
}
