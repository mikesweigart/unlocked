import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import EmpathySection from "@/components/sections/EmpathySection";
import ChallengeCards from "@/components/sections/ChallengeCards";
import BrainStrengths from "@/components/sections/BrainStrengths";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import ParentGuide from "@/components/sections/ParentGuide";
import FinalCTA from "@/components/sections/FinalCTA";
import AboutSection from "@/components/sections/AboutSection";
import AssessmentCTA from "@/components/sections/AssessmentCTA";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <EmpathySection />
        <ChallengeCards />
        <BrainStrengths />
        <HowItWorks />
        <AssessmentCTA />
        <Testimonials />
        <ParentGuide />
        <AboutSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
