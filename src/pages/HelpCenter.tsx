
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import HelpCenterComponent from '@/components/support/HelpCenter';
import Footer from '@/components/Footer';

const HelpCenter = () => {
  return (
    <>
      <Helmet>
        <title>Help Center - Orkhidly</title>
        <meta name="description" content="Get help with Orkhidly's orchid identification and care features. Find guides, tutorials, and support." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 via-purple-600 to-green-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How can we help you grow beautiful orchids?
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Find answers, guides, and expert tips to make your orchid journey successful
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-12">
          <HelpCenterComponent />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default HelpCenter;
