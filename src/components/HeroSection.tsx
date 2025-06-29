
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
            Instantly identify orchid species with our AI technology. 
            Simply snap a photo and unlock the secrets of these magnificent flowers - no green thumb required!
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
            <div className="rounded-3xl p-8 shadow-2xl min-h-[320px] md:min-h-[416px] bg-cover bg-center bg-no-repeat"
                 style={{
                   backgroundImage: "url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4928&q=80')"
                 }}>
              <img 
                src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4928&q=80"
                alt="Beautiful wildflower field with orange poppies and other colorful flowers in a natural meadow setting"
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                loading="lazy"
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
