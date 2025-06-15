
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Shield, Star, Award, CheckCircle, TrendingUp } from 'lucide-react';

const CommunityValidationSystem: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Users className="w-16 h-16 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Community Validation System
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn how expert verification works, how to participate in identification validation, 
          and build your expertise reputation in our growing community.
        </p>
      </div>

      {/* How Expert Verification Works */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">How Expert Verification Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700">
            Our expert verification system combines AI technology with human expertise to ensure 
            the highest accuracy possible. Here's how the multi-layered validation process works:
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">AI Initial Identification</h4>
                <p className="text-blue-700 text-sm">
                  Our AI provides the first identification with a confidence score. Higher confidence 
                  results may go directly to the community, while uncertain results are flagged for expert review.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Community Review</h4>
                <p className="text-green-700 text-sm">
                  Experienced community members can vote on identifications, share their knowledge, 
                  and provide additional context about care, regional variations, or similar species.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h4 className="font-semibold text-purple-800 mb-2">Expert Verification</h4>
                <p className="text-purple-700 text-sm">
                  Certified botanists and professional growers provide final verification for challenging 
                  cases, rare species, and when community consensus is unclear.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg">
              <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">Consensus Building</h4>
                <p className="text-amber-700 text-sm">
                  Multiple validations from different sources create a confidence score. Results with 
                  strong consensus are marked as "Community Verified" or "Expert Verified."
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Participating in Validation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">Participating in Identification Validation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Getting Started</h4>
              <p className="text-gray-700">
                Anyone can participate in community validation, regardless of experience level. 
                Start with obvious cases and work your way up to more challenging identifications.
              </p>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-gray-900">Beginner Validations</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Confirm obvious matches you recognize</li>
                    <li>• Report clearly incorrect identifications</li>
                    <li>• Share your own growing experiences</li>
                    <li>• Ask questions about unfamiliar species</li>
                  </ul>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-900">Advanced Validations</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Distinguish between similar species</li>
                    <li>• Identify regional/seasonal variations</li>
                    <li>• Provide care-specific insights</li>
                    <li>• Mentor other community members</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Validation Guidelines</h4>
              <p className="text-gray-700">
                Effective validation requires more than just agreeing or disagreeing. 
                Provide context, reasoning, and helpful information for others.
              </p>
              
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                  <div className="font-medium text-green-800">Good Validation</div>
                  <div className="text-sm text-green-700">
                    "Confirmed Phalaenopsis amabilis - the lip shape and white petals with yellow center match perfectly. 
                    I have one identical to this."
                  </div>
                </div>
                
                <div className="p-3 bg-red-50 rounded border-l-4 border-red-400">
                  <div className="font-medium text-red-800">Helpful Correction</div>
                  <div className="text-sm text-red-700">
                    "This looks more like Phalaenopsis schilleriana - notice the silver mottling on the leaves 
                    and the smaller, more numerous flowers."
                  </div>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                  <div className="font-medium text-yellow-800">Constructive Uncertainty</div>
                  <div className="text-sm text-yellow-700">
                    "Could be either P. amabilis or P. aphrodite - the flower shape is correct but I'd need 
                    to see the leaves to be certain. Both are common and have similar care."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Building Expertise Reputation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">Building Your Expertise Reputation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700">
            Your reputation in the Orkhidly community grows through consistent, accurate, and helpful contributions. 
            Higher reputation unlocks additional features and gives your validations more weight.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">★</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Contributor</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>0-50 validations</div>
                  <div>Basic voting rights</div>
                  <div>Community discussions</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-blue-800 mb-2">Trusted Member</h4>
                <div className="text-sm text-blue-600 space-y-1">
                  <div>50+ accurate validations</div>
                  <div>Enhanced voting weight</div>
                  <div>Mentor new members</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-purple-800 mb-2">Expert Validator</h4>
                <div className="text-sm text-purple-600 space-y-1">
                  <div>200+ validations, 90%+ accuracy</div>
                  <div>Priority review queue</div>
                  <div>Expert consultation access</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-4">How to Earn Reputation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800">Accurate Validations</div>
                    <div className="text-sm text-green-700">+2 points for each confirmed validation</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-800">Helpful Discussions</div>
                    <div className="text-sm text-blue-700">+1 point for upvoted comments</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-medium text-purple-800">Expert Verification</div>
                    <div className="text-sm text-purple-700">+5 points when experts confirm your ID</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded">
                  <CheckCircle className="w-5 h-5 text-amber-600" />
                  <div>
                    <div className="font-medium text-amber-800">Quality Content</div>
                    <div className="text-sm text-amber-700">+3 points for detailed, helpful responses</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded">
                  <Star className="w-5 h-5 text-indigo-600" />
                  <div>
                    <div className="font-medium text-indigo-800">Consistency</div>
                    <div className="text-sm text-indigo-700">Bonus points for daily participation</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-teal-50 rounded">
                  <Award className="w-5 h-5 text-teal-600" />
                  <div>
                    <div className="font-medium text-teal-800">Mentoring</div>
                    <div className="text-sm text-teal-700">+1 point for helping new members</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expert Badges and Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">Understanding Expert Badges and Certifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700">
            Expert badges help you identify the most reliable sources of information in our community. 
            These are earned through verified credentials and consistently excellent contributions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-emerald-50 border-emerald-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-6 h-6 text-emerald-600" />
                  <h4 className="font-semibold text-emerald-800">Certified Botanist</h4>
                </div>
                <p className="text-sm text-emerald-700 mb-3">
                  PhD in Botany or related field with orchid specialization. Verified academic credentials.
                </p>
                <Badge className="bg-emerald-100 text-emerald-800">Scientific Authority</Badge>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-6 h-6 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Professional Grower</h4>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  Commercial orchid cultivation with verified business credentials and industry experience.
                </p>
                <Badge className="bg-blue-100 text-blue-800">Commercial Expertise</Badge>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-6 h-6 text-purple-600" />
                  <h4 className="font-semibold text-purple-800">Master Cultivator</h4>
                </div>
                <p className="text-sm text-purple-700 mb-3">
                  Decades of growing experience with documented expertise in specific orchid genera.
                </p>
                <Badge className="bg-purple-100 text-purple-800">Practical Master</Badge>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-6 h-6 text-amber-600" />
                  <h4 className="font-semibold text-amber-800">Society Leader</h4>
                </div>
                <p className="text-sm text-amber-700 mb-3">
                  Leadership roles in orchid societies, judging credentials, or education programs.
                </p>
                <Badge className="bg-amber-100 text-amber-800">Community Authority</Badge>
              </CardContent>
            </Card>

            <Card className="bg-teal-50 border-teal-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-6 h-6 text-teal-600" />
                  <h4 className="font-semibold text-teal-800">Regional Expert</h4>
                </div>
                <p className="text-sm text-teal-700 mb-3">
                  Specialized knowledge of orchids in specific geographic regions or climates.
                </p>
                <Badge className="bg-teal-100 text-teal-800">Local Specialist</Badge>
              </CardContent>
            </Card>

            <Card className="bg-rose-50 border-rose-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-6 h-6 text-rose-600" />
                  <h4 className="font-semibold text-rose-800">Rising Expert</h4>
                </div>
                <p className="text-sm text-rose-700 mb-3">
                  Exceptional accuracy and helpfulness in community validations over time.
                </p>
                <Badge className="bg-rose-100 text-rose-800">Community Verified</Badge>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Community Impact */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="py-8 text-center">
          <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Your Validation Makes a Difference
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Every validation you provide helps someone else on their orchid journey. Whether you're 
            confirming a beginner's first successful identification or helping distinguish between 
            rare species, your contribution builds knowledge that benefits the entire community.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge className="bg-green-100 text-green-800">Community Driven</Badge>
            <Badge className="bg-blue-100 text-blue-800">Expert Verified</Badge>
            <Badge className="bg-purple-100 text-purple-800">Always Learning</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityValidationSystem;
