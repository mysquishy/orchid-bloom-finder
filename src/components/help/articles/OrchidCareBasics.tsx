
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Droplets, Sun, Thermometer, Scissors } from 'lucide-react';

const OrchidCareBasics: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Orchid Care for Absolute Beginners</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Don't let orchid care intimidate you! These beautiful plants are more forgiving than you think. 
          Let's start with the essentials that will keep your orchids happy and healthy.
        </p>
        <Badge variant="secondary" className="text-sm">
          <Heart className="w-4 h-4 mr-1" />
          Anxiety-Free Learning
        </Badge>
      </div>

      {/* Reassuring Introduction */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="text-center py-8">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Take a Deep Breath!</h2>
          <p className="text-green-700 text-lg max-w-2xl mx-auto">
            Orchids have a reputation for being "difficult," but that's simply not true. 
            With just a few basic principles, you can successfully grow these stunning plants. 
            Remember: orchids want to live and thrive - you just need to create the right conditions.
          </p>
        </CardContent>
      </Card>

      {/* The 5 Essentials */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900">The 5 Essential Care Elements</CardTitle>
          <p className="text-gray-600">Master these basics, and your orchids will flourish</p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Watering */}
          <div className="border-l-4 border-blue-500 pl-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Droplets className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Watering (The Golden Rule)</h3>
                <p className="text-gray-700 mb-4">
                  <strong>The #1 rule:</strong> When in doubt, don't water. It's better to underwater than overwater orchids.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Simple Watering Schedule:</h4>
                  <ul className="text-blue-700 space-y-1">
                    <li>• <strong>Winter:</strong> Every 10-14 days</li>
                    <li>• <strong>Summer:</strong> Every 7-10 days</li>
                    <li>• <strong>Check first:</strong> Stick your finger 1 inch into the bark - if dry, it's time to water</li>
                  </ul>
                </div>
                <p className="text-gray-600 text-sm">
                  <strong>How to water:</strong> Water thoroughly until it drains from the bottom, then let it drain completely. 
                  Never let your orchid sit in standing water.
                </p>
              </div>
            </div>
          </div>

          {/* Light */}
          <div className="border-l-4 border-yellow-500 pl-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Sun className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Light (Bright but Gentle)</h3>
                <p className="text-gray-700 mb-4">
                  Think "bright shade" - like sitting under a tree on a sunny day. Orchids love light but not direct sun.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">✓ Perfect Spots:</h4>
                    <ul className="text-green-700 space-y-1 text-sm">
                      <li>• East-facing windows</li>
                      <li>• Shaded south-facing windows</li>
                      <li>• 2-3 feet from bright windows</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">✗ Avoid:</h4>
                    <ul className="text-red-700 space-y-1 text-sm">
                      <li>• Direct afternoon sun</li>
                      <li>• Dark corners</li>
                      <li>• Hot windowsills</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Temperature & Humidity */}
          <div className="border-l-4 border-purple-500 pl-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Temperature & Humidity</h3>
                <p className="text-gray-700 mb-4">
                  Good news: if you're comfortable, your orchid probably is too!
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2">Temperature:</h4>
                      <ul className="text-purple-700 space-y-1 text-sm">
                        <li>• Day: 65-80°F (18-27°C)</li>
                        <li>• Night: 60-70°F (15-21°C)</li>
                        <li>• Small night drop is beneficial</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2">Humidity:</h4>
                      <ul className="text-purple-700 space-y-1 text-sm">
                        <li>• Ideal: 40-60%</li>
                        <li>• Use a humidity tray</li>
                        <li>• Group plants together</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Air Circulation */}
          <div className="border-l-4 border-green-500 pl-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Scissors className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Air Circulation</h3>
                <p className="text-gray-700 mb-4">
                  Orchids love fresh air! Gentle air movement prevents problems and keeps your orchid healthy.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Easy Solutions:</h4>
                  <ul className="text-green-700 space-y-1">
                    <li>• Place near (not directly under) a ceiling fan</li>
                    <li>• Open windows when weather permits</li>
                    <li>• Use a small oscillating fan on low speed</li>
                    <li>• Avoid stagnant, stuffy areas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Potting Medium */}
          <div className="border-l-4 border-orange-500 pl-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Potting Medium</h3>
                <p className="text-gray-700 mb-4">
                  Forget regular potting soil! Orchids need special bark-based mixes that drain quickly.
                </p>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">What to Use:</h4>
                  <ul className="text-orange-700 space-y-1">
                    <li>• Commercial orchid bark mix (easiest option)</li>
                    <li>• Medium-grade fir bark</li>
                    <li>• Some mixes include perlite and moss</li>
                    <li>• Repot every 1-2 years or when bark breaks down</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Beginner Mistakes */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-800">Avoid These Common Beginner Mistakes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-yellow-800 mb-3">Watering Mistakes:</h4>
              <ul className="space-y-2 text-yellow-700">
                <li>• Watering on a strict schedule instead of checking soil</li>
                <li>• Using ice cubes (this can shock the roots)</li>
                <li>• Leaving water in the crown of the plant</li>
                <li>• Using softened or distilled water exclusively</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-3">Care Mistakes:</h4>
              <ul className="space-y-2 text-yellow-700">
                <li>• Moving the plant too frequently</li>
                <li>• Over-fertilizing (less is more)</li>
                <li>• Repotting too often</li>
                <li>• Panicking over normal leaf yellowing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Encouragement */}
      <Card className="bg-gradient-to-r from-green-50 to-purple-50 border-green-200">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">You've Got This! 🌸</h3>
          <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
            Remember, orchid care is more about consistency than perfection. Your orchids will forgive minor mistakes, 
            and each plant will teach you something new. Start with these basics, observe your plants, and adjust as needed.
          </p>
          <p className="text-green-700 font-medium">
            Most importantly: enjoy the journey! Orchid growing should bring you joy, not stress.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrchidCareBasics;
