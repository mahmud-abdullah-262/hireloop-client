import { getSessionData } from "@/lib/session/getSession";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { redirect } from "next/navigation";

export default async function MainLayout ({children}){

  const user = await getSessionData()
  
  return <div className="min-h-screen overflow-hidden">
    <Navbar user={user}/>
    {children}
    <Footer/>
    </div>;
}