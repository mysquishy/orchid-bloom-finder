
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Languages, CreditCard, Users, MapPin, Clock, TrendingUp, Settings } from 'lucide-react';

const InternationalExpansion: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">International Expansion</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive localization and international scaling features designed to support 
          global operations across diverse markets, languages, and regulatory environments.
        </p>
        <Badge className="bg-blue-100 text-blue-800">Global Platform</Badge>
      </div>

      {/* Multi-language Support */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Languages className="w-6 h-6" />
            Multi-Language Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-4">Comprehensive Localization Framework</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-800 mb-3">Supported Languages</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• English (US, UK, AU, CA)</li>
                  <li>• Spanish (Spain, Mexico, Argentina)</li>
                  <li>• French (France, Canada)</li>
                  <li>• German, Italian, Portuguese</li>
                  <li>• Mandarin, Japanese, Korean</li>
                  <li>• Dutch, Swedish, Norwegian</li>
                  <li>• Russian, Polish, Czech</li>
                  <li>• Arabic, Hindi, Thai</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-3">Localization Features</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Real-time interface translation</li>
                  <li>• AI-powered plant description translation</li>
                  <li>• Localized plant common names</li>
                  <li>• Cultural adaptation of content</li>
                  <li>• Right-to-left (RTL) language support</li>
                  <li>• Unicode and emoji support</li>
                  <li>• Voice command localization</li>
                  <li>• Regional help documentation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <Globe className="w-8 h-8 text-green-600 mb-2" />
                <h4 className="font-medium text-green-900 mb-2">Translation Quality</h4>
                <p className="text-sm text-green-700">
                  Professional translation with botanical terminology accuracy
                </p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <Settings className="w-8 h-8 text-purple-600 mb-2" />
                <h4 className="font-medium text-purple-900 mb-2">Dynamic Switching</h4>
                <p className="text-sm text-purple-700">
                  Real-time language switching without app restart
                </p>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <Users className="w-8 h-8 text-orange-600 mb-2" />
                <h4 className="font-medium text-orange-900 mb-2">Community Translation</h4>
                <p className="text-sm text-orange-700">
                  Expert botanist validation of regional terminology
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Regional Plant Database Coverage */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <MapPin className="w-6 h-6" />
            Regional Plant Database Coverage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-4">Global Flora Database</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-green-800 mb-3">Regional Coverage</h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• <strong>North America:</strong> 45,000+ native species</li>
                  <li>• <strong>Europe:</strong> 35,000+ documented species</li>
                  <li>• <strong>Asia-Pacific:</strong> 85,000+ tropical species</li>
                  <li>• <strong>South America:</strong> 60,000+ rainforest species</li>
                  <li>• <strong>Africa:</strong> 40,000+ diverse ecosystems</li>
                  <li>• <strong>Australia:</strong> 25,000+ endemic species</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-800 mb-3">Specialized Collections</h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• Endemic species by bioregion</li>
                  <li>• Climate-specific plant groups</li>
                  <li>• Traditional medicinal plants</li>
                  <li>• Agricultural crop varieties</li>
                  <li>• Endangered species monitoring</li>
                  <li>• Invasive species identification</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">Database Expansion Timeline</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-yellow-700">
              <div>
                <strong>Q1 2024:</strong> Southeast Asia expansion (20K species)
              </div>
              <div>
                <strong>Q2 2024:</strong> Mediterranean region (15K species)
              </div>
              <div>
                <strong>Q3 2024:</strong> Central America (18K species)
              </div>
              <div>
                <strong>Q4 2024:</strong> Middle East & North Africa (12K species)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Currency & Payment Processing */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <CreditCard className="w-6 h-6" />
            Currency and Payment Processing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-4">Global Payment Infrastructure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-purple-800 mb-3">Supported Currencies</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• USD, EUR, GBP, CAD, AUD</li>
                  <li>• JPY, CNY, KRW, HKD, SGD</li>
                  <li>• BRL, MXN, ARS, CLP, COP</li>
                  <li>• CHF, SEK, NOK, DKK, PLN</li>
                  <li>• INR, THB, MYR, IDR, PHP</li>
                  <li>• ZAR, EGP, AED, SAR</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-800 mb-3">Payment Methods</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Credit/Debit cards (Visa, Mastercard, Amex)</li>
                  <li>• Digital wallets (PayPal, Apple Pay, Google Pay)</li>
                  <li>• Bank transfers and direct debit</li>
                  <li>• Regional payment methods (Alipay, WeChat Pay)</li>
                  <li>• SEPA for European Union</li>
                  <li>• Cryptocurrency support (Bitcoin, Ethereum)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Pricing Localization</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Purchasing power parity adjustments</li>
                <li>• Regional pricing strategies</li>
                <li>• Educational institution discounts</li>
                <li>• Developing market accessibility</li>
                <li>• Enterprise volume pricing</li>
              </ul>
            </div>
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Tax Compliance</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Automatic VAT calculation (EU)</li>
                <li>• GST compliance (Canada, Australia)</li>
                <li>• Sales tax handling (US states)</li>
                <li>• Digital service tax considerations</li>
                <li>• Real-time tax rate updates</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cultural Adaptation Features */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Users className="w-6 h-6" />
            Cultural Adaptation Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-4">Culturally Sensitive Design</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-orange-800 mb-3">Visual Adaptations</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Color scheme cultural considerations</li>
                  <li>• Image and iconography localization</li>
                  <li>• Font selection for readability</li>
                  <li>• Layout adaptation for text expansion</li>
                  <li>• Cultural symbols and meanings</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-orange-800 mb-3">Content Adaptation</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Traditional plant knowledge integration</li>
                  <li>• Local gardening practices and seasons</li>
                  <li>• Regional climate considerations</li>
                  <li>• Cultural plant significance</li>
                  <li>• Indigenous knowledge respect</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Regional Partnerships</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Local botanical institutions</li>
                <li>• Agricultural extension services</li>
                <li>• Indigenous plant experts</li>
                <li>• Regional garden centers</li>
                <li>• Educational partnerships</li>
              </ul>
            </div>
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Local Regulations</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Plant import/export restrictions</li>
                <li>• Endangered species protection</li>
                <li>• Biopiracy prevention measures</li>
                <li>• Traditional knowledge protocols</li>
                <li>• Conservation compliance</li>
              </ul>
            </div>
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Community Integration</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Local expert verification</li>
                <li>• Regional plant societies</li>
                <li>• Cultural plant celebrations</li>
                <li>• Traditional medicine respect</li>
                <li>• Community-driven content</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expansion Metrics & Timeline */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <TrendingUp className="w-6 h-6" />
            Expansion Metrics & Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-4">Global Rollout Strategy</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-blue-800 mb-3">Phase 1: Core Markets (Q1-Q2 2024)</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• United Kingdom and Ireland</li>
                    <li>• Australia and New Zealand</li>
                    <li>• Canada (English and French)</li>
                    <li>• Germany and Austria</li>
                    <li>• Target: 2M additional users</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 mb-3">Phase 2: Growth Markets (Q3-Q4 2024)</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• France, Spain, and Italy</li>
                    <li>• Japan and South Korea</li>
                    <li>• Netherlands and Scandinavia</li>
                    <li>• Brazil and Mexico</li>
                    <li>• Target: 5M additional users</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Success Metrics</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 40% international user base by end of 2024</li>
                <li>• 95% localization accuracy rating</li>
                <li>• &lt;3 second response time globally</li>
                <li>• 50+ local partnerships established</li>
                <li>• 25+ supported languages</li>
              </ul>
            </div>
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Resource Requirements</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• International operations team (8-10 people)</li>
                <li>• Localization specialists per region</li>
                <li>• Regional marketing managers</li>
                <li>• Customer support in local languages</li>
                <li>• Estimated investment: $2M-3M annually</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-center text-blue-800">International Expansion Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Market Research</h4>
              <p className="text-xs text-gray-600">6-8 weeks: Regional analysis and opportunity assessment</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Languages className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Localization</h4>
              <p className="text-xs text-gray-600">8-12 weeks: Translation and cultural adaptation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Infrastructure</h4>
              <p className="text-xs text-gray-600">4-6 weeks: Regional deployment and optimization</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Launch & Scale</h4>
              <p className="text-xs text-gray-600">2-4 weeks: Market entry and growth optimization</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Expected ROI & Impact</h4>
            <p className="text-sm text-green-700">
              International expansion projected to increase total addressable market by 300%, 
              with break-even expected within 18 months of regional launch.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InternationalExpansion;
