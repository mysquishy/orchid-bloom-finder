
import React from "react";
import { Helmet } from 'react-helmet-async';
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ImageUploadSection from "@/components/ImageUploadSection";
import SubscriptionBanner from "@/components/SubscriptionBanner";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Orkhidly - AI-Powered Orchid Identification & Care</title>
        <meta name="description" content="Identify orchids instantly with AI, get beginner-friendly care guides, and build your digital garden. Perfect for anxious plant parents and orchid beginners." />
        <meta name="keywords" content="orchid identification, plant care, AI plant identification, orchid care guide, plant health, beginner friendly" />
        <meta property="og:title" content="Orkhidly - AI-Powered Orchid Identification" />
        <meta property="og:description" content="Identify orchids instantly with AI and get beginner-friendly care guides for anxious plant parents." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <SubscriptionBanner />
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ImageUploadSection />
      </div>
    </>
  );
};

export default Index;
