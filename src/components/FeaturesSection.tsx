
import React from 'react';
import { Camera, ArrowUp, Menu, ArrowDown } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Camera,
      title: "Instant Recognition",
      description: "Upload or capture photos of orchids and get instant species identification. No plant expertise needed - we'll figure it out together!"
    },
    {
      icon: ArrowUp,
      title: "Expert Database",
      description: "Access comprehensive information about thousands of orchid species from around the world, explained in friendly, non-intimidating language."
    },
    {
      icon: Menu,
      title: "Detailed Care Guides",
      description: "Learn about care instructions, native habitats, and fascinating facts. Perfect for beginners who want to learn without feeling overwhelmed."
    },
    {
      icon: ArrowDown,
      title: "Mobile Optimized",
      description: "Perfect for field identification with responsive design that works seamlessly on all devices. Take it to the garden center with confidence!"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-playfair text-gray-900 mb-6">
            Why Choose
            <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent"> 
              Or<span className="text-green-600">k</span>hidly?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the most approachable orchid identification technology, designed especially for beginners and anxious plant parents.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 bg-gradient-to-br from-green-50 to-purple-50 rounded-2xl border border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-green-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">25,000+</div>
              <div className="text-green-100 text-lg">Orchid Species</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">99.2%</div>
              <div className="text-green-100 text-lg">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500K+</div>
              <div className="text-green-100 text-lg">Happy Plant Parents</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
