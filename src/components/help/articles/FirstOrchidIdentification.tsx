
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Lightbulb, CheckCircle, AlertCircle } from 'lucide-react';

const FirstOrchidIdentification: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Your First Orchid Identification</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Follow this step-by-step guide to get the best identification results from your orchid photos.
        </p>
        <Badge variant="secondary" className="text-sm">
          <Camera className="w-4 h-4 mr-1" />
          Photo Tutorial
        </Badge>
      </div>

      {/* Photo Requirements */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Lightbulb className="w-5 h-5" />
            Before You Start: Photo Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Do This:
              </h4>
              <ul className="space-y-2 text-green-700">
                <li>• Use natural daylight when possible</li>
                <li>• Include the flower in your photo</li>
                <li>• Get close enough to see details</li>
                <li>• Hold your phone steady</li>
                <li>• Clean your camera lens first</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Avoid This:
              </h4>
              <ul className="space-y-2 text-red-700">
                <li>• Dark or dim lighting</li>
                <li>• Blurry or shaky photos</li>
                <li>• Photos with just leaves</li>
                <li>• Too much background clutter</li>
                <li>• Using flash (creates harsh shadows)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step-by-step Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900">Step-by-Step Photo Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1 */}
          <div className="border-l-4 border-green-500 pl-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Open the Camera</h3>
                <p className="text-gray-700 mb-3">
                  Tap the camera icon on the home screen or use the "Start Identifying" button. 
                  Give Orkhidly permission to access your camera when prompted.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> You can also upload existing photos from your gallery using the gallery icon.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="border-l-4 border-green-500 pl-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Position Your Orchid</h3>
                <p className="text-gray-700 mb-3">
                  Place your orchid near a window with natural light. The flower should be clearly visible and well-lit.
                  Avoid direct sunlight which can create harsh shadows.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 italic">
                    [Image placeholder: Orchid positioned near window with good lighting]
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="border-l-4 border-green-500 pl-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Frame Your Shot</h3>
                <p className="text-gray-700 mb-3">
                  Fill about 70% of your camera frame with the orchid flower. Include some leaves if possible, 
                  but make sure the flower is the main focus.
                </p>
                <ul className="text-gray-600 space-y-1 mb-3">
                  <li>• Get close enough to see flower details</li>
                  <li>• Keep the orchid centered in frame</li>
                  <li>• Include multiple flowers if your plant has them</li>
                </ul>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 italic">
                    [Image placeholder: Well-framed orchid photo showing proper composition]
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="border-l-4 border-green-500 pl-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Take the Photo</h3>
                <p className="text-gray-700 mb-3">
                  Hold your phone steady and tap the capture button. The AI analysis will begin automatically.
                  Don't worry if it takes a few seconds - our AI is carefully examining your orchid!
                </p>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Not happy with the result?</strong> You can always take another photo or try different angles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pro Tips */}
      <Card className="bg-purple-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800">Pro Tips for Better Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-purple-800 mb-3">Lighting Tips</h4>
              <ul className="space-y-2 text-purple-700">
                <li>• Morning light (9-11 AM) is ideal</li>
                <li>• Overcast days provide soft, even lighting</li>
                <li>• Use a white sheet as a backdrop for contrast</li>
                <li>• Turn off indoor lights to avoid color mixing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-800 mb-3">Angle & Composition</h4>
              <ul className="space-y-2 text-purple-700">
                <li>• Try photographing from slightly above the flower</li>
                <li>• Include the flower's profile for better identification</li>
                <li>• Take multiple photos from different angles</li>
                <li>• Show the plant's growth pattern if unique</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What's Next */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">What Happens Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            After taking your photo, Orkhidly's AI will analyze it and provide you with:
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-gray-700">Species identification with confidence score</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-gray-700">Personalized care instructions</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-gray-700">Option to add to your digital garden</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FirstOrchidIdentification;
