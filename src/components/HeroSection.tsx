
import React from 'react';
import { Camera, ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToIdentify = () => {
    const identifySection = document.getElementById('identify');
    if (identifySection) {
      identifySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Camera className="w-4 h-4" />
            <span>AI-Powered Plant Identification</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-playfair text-gray-900 mb-6 leading-tight">
            Discover the
            <span className="block bg-gradient-to-r from-green-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              Beauty of Orchids
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Instantly identify orchid species with our advanced AI technology. 
            Simply snap a photo and unlock the secrets of these magnificent flowers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={scrollToIdentify}
              className="bg-gradient-to-r from-green-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Identifying
            </button>
            <button className="text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:text-green-600 transition-colors border-2 border-gray-200 hover:border-green-300">
              Learn More
            </button>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-green-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1469908618397-c1357b3a3e1a?auto=format&fit=crop&w=1200&q=80"
                alt="Beautiful collection of orchid flowers showcasing various species including Phalaenopsis and Dendrobium orchids in elegant purple, pink and white colors"
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                loading="lazy"
                onError={(e) => {
                  // Fallback to a different orchid image if the primary fails
                  const img = e.target as HTMLImageElement;
                  if (img.src.includes('1469908618397')) {
                    img.src = "https://images.unsplash.com/photo-1516401266446-6432a8a07d41?auto=format&fit=crop&w=1200&q=80";
                  } else if (img.src.includes('1516401266446')) {
                    img.src = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80";
                  }
                }}
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-12 animate-bounce">
            <ArrowDown className="w-6 h-6 text-gray-400 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
