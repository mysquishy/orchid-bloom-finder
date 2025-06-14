
import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import ImageUploadSection from '../components/ImageUploadSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ImageUploadSection />
      <Footer />
    </div>
  );
};

export default Index;
