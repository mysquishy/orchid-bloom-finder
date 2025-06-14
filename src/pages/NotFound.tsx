
import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Flower, Search } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    rotate: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: [0.4, 0, 0.6, 1] // cubic-bezier for easeInOut
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50 flex items-center justify-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-md mx-auto"
      >
        {/* Floating Orchid Icons */}
        <div className="relative mb-8">
          <motion.div
            animate={floatingAnimation}
            className="absolute -top-4 -left-8 text-green-300"
          >
            <Flower className="w-8 h-8" />
          </motion.div>
          <motion.div
            animate={{
              ...floatingAnimation,
              transition: {
                ...floatingAnimation.transition,
                delay: 1
              }
            }}
            className="absolute -top-6 -right-6 text-purple-300"
          >
            <Flower className="w-6 h-6" />
          </motion.div>
          <motion.div
            animate={{
              ...floatingAnimation,
              transition: {
                ...floatingAnimation.transition,
                delay: 2
              }
            }}
            className="absolute -bottom-2 left-4 text-pink-300"
          >
            <Flower className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Main 404 Content */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent mb-4">
            404
          </h1>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-2xl font-semibold text-gray-900 mb-3"
        >
          Oops! This orchid doesn't exist
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-gray-600 mb-8 leading-relaxed"
        >
          Looks like you've wandered into uncharted botanical territory. 
          Let's get you back to exploring our beautiful orchid collection.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-green-200 hover:border-green-300 hover:bg-green-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          
          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700"
          >
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </Button>
          
          <Button
            onClick={() => navigate('/database')}
            variant="outline"
            className="border-purple-200 hover:border-purple-300 hover:bg-purple-50"
          >
            <Search className="w-4 h-4 mr-2" />
            Explore Orchids
          </Button>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          variants={itemVariants}
          className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-green-100"
        >
          <p className="text-sm text-gray-600">
            <strong>Lost?</strong> Try searching for orchids in our database or return to the homepage to start your botanical journey.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
