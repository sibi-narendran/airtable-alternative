import Header from "@/components/Header";
import Hero from "@/components/Hero";
import KeyFeatures from "@/components/KeyFeatures";
import SocialProofBar from "@/components/SocialProofBar";
import HowItWorks from "@/components/HowItWorks";
import IntegrationsSection from "@/components/IntegrationsSection";
import AirtableMigration from "@/components/AirtableMigration";
import ValueGrid from "@/components/ValueGrid";
import FinalCTA from "@/components/FinalCTA";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior for the entire page
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <KeyFeatures />
      
      <HowItWorks />
      
      <AirtableMigration />
      
      <SocialProofBar />
      
      <IntegrationsSection />
      
      <div id="features">
        <ValueGrid />
      </div>
      
      <FinalCTA />
    </div>
  );
};

export default Index;
