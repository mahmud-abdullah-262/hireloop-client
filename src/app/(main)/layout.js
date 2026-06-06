import { getSessionData } from "@/lib/session/getSession";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MainLayout ({children}){
  const user = getSessionData()
  return <div className="min-h-screen overflow-hidden">
    <Navbar user={user}/>
    {children}
    <Footer/>
    </div>;
}