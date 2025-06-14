
import React, { useState, useRef } from 'react';
import { Camera, ArrowUp } from 'lucide-react';

const ImageUploadSection = () => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      // Here you would typically show results
      alert('Analysis complete! This appears to be a Phalaenopsis orchid (Moth Orchid).');
    }, 3000);
  };

  const openCamera = () => {
    // In a real app, this would open camera
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.click();
    }
  };

  return (
    <section id="identify" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-playfair text-gray-900 mb-6">
            Start
            <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent"> Identifying</span>
          </h2>
          <p className="text-xl text-gray-600">
            Upload an image or take a photo to identify your orchid
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-gradient-to-br from-green-50 to-purple-50 rounded-3xl p-8 border-2 border-dashed border-green-200">
          {!selectedImage ? (
            <div
              className={`text-center py-16 transition-all duration-300 ${
                dragOver ? 'scale-105' : ''
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ArrowUp className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Drop your orchid image here
              </h3>
              <p className="text-gray-600 mb-8">
                or click to browse from your device
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-green-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-green-600 hover:to-purple-700 transition-all duration-300"
                >
                  Choose File
                </button>
                <button
                  onClick={openCamera}
                  className="flex items-center space-x-2 text-gray-700 px-8 py-3 rounded-full font-semibold border-2 border-gray-200 hover:border-green-300 hover:text-green-600 transition-all duration-300"
                >
                  <Camera className="w-5 h-5" />
                  <span>Take Photo</span>
                </button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                <img
                  src={selectedImage}
                  alt="Selected orchid"
                  className="max-w-full max-h-96 mx-auto rounded-2xl shadow-lg"
                />
              </div>
              
              {!isAnalyzing ? (
                <div className="space-y-4">
                  <button
                    onClick={handleAnalyze}
                    className="bg-gradient-to-r from-green-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-green-600 hover:to-purple-700 transition-all duration-300"
                  >
                    Analyze Image
                  </button>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="block mx-auto text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Choose Different Image
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
                  <p className="text-gray-600">Analyzing your orchid image...</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-green-50 rounded-2xl">
            <h4 className="font-semibold text-gray-900 mb-2">Clear Photos</h4>
            <p className="text-gray-600 text-sm">Ensure the orchid is well-lit and in focus</p>
          </div>
          <div className="p-6 bg-purple-50 rounded-2xl">
            <h4 className="font-semibold text-gray-900 mb-2">Close-up Shots</h4>
            <p className="text-gray-600 text-sm">Capture the flower details for best results</p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl">
            <h4 className="font-semibold text-gray-900 mb-2">Multiple Angles</h4>
            <p className="text-gray-600 text-sm">Try different angles if first attempt isn't clear</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageUploadSection;
