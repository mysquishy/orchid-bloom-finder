
import React from "react";
import { Helmet } from 'react-helmet-async';
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ImageUploadSection from "@/components/ImageUploadSection";
import Footer from "@/components/Footer";
import SubscriptionBanner from "@/components/SubscriptionBanner";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>OrchidAI - AI-Powered Orchid Identification & Care</title>
        <meta name="description" content="Identify orchids instantly with AI, get personalized care guides, and build your digital garden. Free plant identification with premium features." />
        <meta name="keywords" content="orchid identification, plant care, AI plant identification, orchid care guide, plant health" />
        <meta property="og:title" content="OrchidAI - AI-Powered Orchid Identification" />
        <meta property="og:description" content="Identify orchids instantly with AI and get personalized care guides." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <Navigation />
        <SubscriptionBanner />
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ImageUploadSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
