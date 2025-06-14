
import React from 'react';
import { Camera, ArrowUp, Menu } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Camera,
      number: "01",
      title: "Capture or Upload",
      description: "Take a photo of an orchid or upload an existing image from your device. Our system works with any clear photo of the flower."
    },
    {
      icon: ArrowUp,
      number: "02", 
      title: "AI Analysis",
      description: "Our advanced AI analyzes the image, examining key features like petal shape, color patterns, and overall structure."
    },
    {
      icon: Menu,
      number: "03",
      title: "Get Results",
      description: "Receive instant identification results with detailed information about the species, care tips, and fascinating facts."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-playfair text-gray-900 mb-6">
            How It
            <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent"> Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Identify any orchid species in just three simple steps. It's that easy!
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-green-300 to-purple-300 transform translate-x-6 z-0"></div>
              )}
              
              {/* Step Card */}
              <div className="relative z-10 text-center">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-purple-600 text-white rounded-full text-xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl transition-shadow duration-300">
                  <step.icon className="w-10 h-10 text-gradient-to-br from-green-500 to-purple-600" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Video Placeholder */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="bg-gradient-to-br from-green-100 to-purple-100 rounded-2xl aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  See OrchidAI in Action
                </h3>
                <p className="text-gray-600">
                  Watch how easy it is to identify orchids with our AI technology
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
