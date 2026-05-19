import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import JourneySelector from "@/components/sections/JourneySelector";
import EmpathySection from "@/components/sections/EmpathySection";
import ChildInnerWorld from "@/components/sections/ChildInnerWorld";
import ChallengeCards from "@/components/sections/ChallengeCards";
import BrainStrengths from "@/components/sections/BrainStrengths";
import HowItWorks from "@/components/sections/HowItWorks";
import ThirtyDays from "@/components/sections/ThirtyDays";
import AssessmentCTA from "@/components/sections/AssessmentCTA";
import Testimonials from "@/components/sections/Testimonials";
import ParentGuide from "@/components/sections/ParentGuide";
import AboutSection from "@/components/sections/AboutSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        {/* 1. Hero — the parent's world, the possibility */}
        <HeroSection />

        {/* 2. Journey selector — personalize from the first scroll */}
        <JourneySelector />

        {/* 3. Empathy — specific moments + the villain (broken system) */}
        <EmpathySection />

        {/* 4. Child's inner world — closes the empathy gap */}
        <ChildInnerWorld />

        {/* 5. Challenge cards — name the diagnosis, reframe it */}
        <ChallengeCards />

        {/* 6. Brain Strengths — the reframe: same wiring, different story */}
        <BrainStrengths />

        {/* 7. How It Works — the plan, simple and clear */}
        <HowItWorks />

        {/* 8. Your First 30 Days — process transparency, trust building */}
        <ThirtyDays />

        {/* 9. Assessment CTA — take action, discover strengths */}
        <AssessmentCTA />

        {/* 10. Testimonials — social proof with transformation arcs */}
        <Testimonials />

        {/* 11. Parent Guide — free resource, lead capture */}
        <ParentGuide />

        {/* 12. About — the guide's empathy and authority */}
        <AboutSection />

        {/* 13. Final CTA — the call to action, the stakes */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
