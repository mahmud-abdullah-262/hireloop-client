import Image from "next/image";
import Banner from "../components/Banner";
import Stats from "../components/Stats";
import FeaturedJob from "../components/FeaturedJob";
import FeaturesSection from "../components/FeaturesSection";
import Plan from "./plan/Plan";
import CtaBanner from "../components/CtaBanner";

export default function Home() {
  return (
    <>
   <Banner/>
   <Stats/>
   <FeaturedJob></FeaturedJob>
   <FeaturesSection></FeaturesSection>
   <Plan/>
   <CtaBanner></CtaBanner>
    </>
  );
}
