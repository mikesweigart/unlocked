import Navigation from "@/components/layout/Navigation";
import MobileCTABar from "@/components/layout/MobileCTABar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import SoundFamiliar from "@/components/sections/SoundFamiliar";
import MeetKelly from "@/components/sections/MeetKelly";
import HelpFramework from "@/components/sections/HelpFramework";
import Services from "@/components/sections/Services";
import EvaluationGuide from "@/components/sections/EvaluationGuide";
import ChallengeCards from "@/components/sections/ChallengeCards";
import AssessmentCTA from "@/components/sections/AssessmentCTA";
import Resources from "@/components/sections/Resources";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";
import { BOOKING_URL, EMAIL, PHONE_HREF, SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "UnlockEd",
  description:
    "Educational support agency for families who suspect, or already know, their child learns differently.",
  url: SITE_URL,
  telephone: PHONE_HREF.replace("tel:", ""),
  email: EMAIL,
  founder: { "@type": "Person", name: "Kelly Moore" },
  areaServed: "Atlanta, Georgia",
  address: { "@type": "PostalAddress", addressLocality: "Peachtree Corners", addressRegion: "GA", addressCountry: "US" },
  potentialAction: { "@type": "ReserveAction", target: BOOKING_URL },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main className="pb-16 lg:pb-0">
        <HeroSection />
        <SoundFamiliar />
        <MeetKelly />
        <HelpFramework />
        <Services />
        <EvaluationGuide />
        <ChallengeCards />
        <AssessmentCTA />
        <Resources />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCTABar />
    </>
  );
}
