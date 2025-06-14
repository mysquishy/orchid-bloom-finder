
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  DollarSign, 
  Users, 
  TrendingUp,
  BarChart3,
  Calendar,
  Briefcase,
  Award,
  Globe
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface CohortData {
  cohort: string;
  size: number;
  retention_1m: number;
  retention_3m: number;
  retention_6m: number;
  retention_12m: number;
  avg_revenue: number;
  acquisition_channel: string;
}

interface CompetitorMetric {
  competitor: string;
  market_share: number;
  feature_score: number;
  pricing_position: string;
  customer_satisfaction: number;
  growth_rate: number;
}

interface InvestmentMetric {
  category: string;
  invested_amount: number;
  expected_return: number;
  actual_return: number;
  roi_percentage: number;
  payback_months: number;
}

const OperationalInsightsDashboard: React.FC = () => {
  const [cohortData, setCohortData] = useState<CohortData[]>([]);
  const [competitorData, setCompetitorData] = useState<CompetitorMetric[]>([]);
  const [investmentData, setInvestmentData] = useState<InvestmentMetric[]>([]);
  const [loading, setLoading] = useState(true);

  const unit_economics_data = [
    { month: 'Jan', cac: 45, ltv: 185, payback_period: 3.2 },
    { month: 'Feb', cac: 42, ltv: 192, payback_period: 3.0 },
    { month: 'Mar', cac: 48, ltv: 198, payback_period: 3.1 },
    { month: 'Apr', cac: 44, ltv: 205, payback_period: 2.9 },
    { month: 'May', cac: 41, ltv: 212, payback_period: 2.8 },
    { month: 'Jun', cac: 39, ltv: 218, payback_period: 2.7 }
  ];

  const mrr_arr_data = [
    { month: 'Jan 2024', mrr: 42000, arr: 504000 },
    { month: 'Feb 2024', mrr: 45000, arr: 540000 },
    { month: 'Mar 2024', mrr: 49000, arr: 588000 },
    { month: 'Apr 2024', mrr: 53000, arr: 636000 },
    { month: 'May 2024', mrr: 58000, arr: 696000 },
    { month: 'Jun 2024', mrr: 62000, arr: 744000 }
  ];

  const feature_roi_data = [
    { feature: 'AI Identification', investment: 85000, revenue_impact: 245000, roi: 188 },
    { feature: 'Care Calendar', investment: 35000, revenue_impact: 95000, roi: 171 },
    { feature: 'Expert Consultations', investment: 55000, revenue_impact: 125000, roi: 127 },
    { feature: 'Community Features', investment: 45000, revenue_impact: 78000, roi: 73 },
    { feature: 'Mobile App', investment: 125000, revenue_impact: 185000, roi: 48 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  useEffect(() => {
    loadOperationalData();
  }, []);

  const loadOperationalData = async () => {
    try {
      setLoading(true);
      
      // Mock cohort data
      const mockCohorts: CohortData[] = [
        {
          cohort: 'Q1 2024',
          size: 450,
          retention_1m: 78,
          retention_3m: 65,
          retention_6m: 58,
          retention_12m: 52,
          avg_revenue: 145,
          acquisition_channel: 'Organic Search'
        },
        {
          cohort: 'Q4 2023',
          size: 380,
          retention_1m: 82,
          retention_3m: 68,
          retention_6m: 61,
          retention_12m: 55,
          avg_revenue: 162,
          acquisition_channel: 'Social Media'
        },
        {
          cohort: 'Q3 2023',
          size: 320,
          retention_1m: 75,
          retention_3m: 62,
          retention_6m: 55,
          retention_12m: 48,
          avg_revenue: 138,
          acquisition_channel: 'Paid Ads'
        }
      ];

      // Mock competitor data
      const mockCompetitors: CompetitorMetric[] = [
        {
          competitor: 'PlantNet',
          market_share: 25,
          feature_score: 78,
          pricing_position: 'Free',
          customer_satisfaction: 4.2,
          growth_rate: 15
        },
        {
          competitor: 'iNaturalist',
          market_share: 35,
          feature_score: 82,
          pricing_position: 'Freemium',
          customer_satisfaction: 4.5,
          growth_rate: 12
        },
        {
          competitor: 'PlantIn',
          market_share: 15,
          feature_score: 85,
          pricing_position: 'Premium',
          customer_satisfaction: 4.1,
          growth_rate: 28
        }
      ];

      // Mock investment data
      const mockInvestments: InvestmentMetric[] = [
        {
          category: 'Product Development',
          invested_amount: 250000,
          expected_return: 450000,
          actual_return: 520000,
          roi_percentage: 108,
          payback_months: 8
        },
        {
          category: 'Marketing & Acquisition',
          invested_amount: 180000,
          expected_return: 320000,
          actual_return: 285000,
          roi_percentage: 58,
          payback_months: 12
        },
        {
          category: 'Infrastructure',
          invested_amount: 120000,
          expected_return: 200000,
          actual_return: 195000,
          roi_percentage: 63,
          payback_months: 10
        }
      ];

      setCohortData(mockCohorts);
      setCompetitorData(mockCompetitors);
      setInvestmentData(mockInvestments);
    } catch (error) {
      console.error('Failed to load operational data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Operational Intelligence Dashboard</h2>
          <p className="text-gray-600">Strategic insights for business growth and competitive positioning</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <Award className="w-4 h-4 mr-2" />
          Export Strategic Report
        </Button>
      </div>

      <Tabs defaultValue="cohorts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="cohorts">Cohort Analysis</TabsTrigger>
          <TabsTrigger value="competitive">Competitive Intel</TabsTrigger>
          <TabsTrigger value="investment">Investment ROI</TabsTrigger>
          <TabsTrigger value="unit-economics">Unit Economics</TabsTrigger>
          <TabsTrigger value="strategic">Strategic Support</TabsTrigger>
        </TabsList>

        <TabsContent value="cohorts">
          <div className="space-y-6">
            {/* Cohort Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">1,150</div>
                    <div className="text-sm text-gray-600">Total Cohorted Users</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <Target className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold">65%</div>
                    <div className="text-sm text-gray-600">Avg 3M Retention</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <DollarSign className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold">$148</div>
                    <div className="text-sm text-gray-600">Avg Revenue/User</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <div className="text-2xl font-bold">+12%</div>
                    <div className="text-sm text-gray-600">Cohort Improvement</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Cohort Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Multi-Dimensional Cohort Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cohortData.map((cohort) => (
                    <div key={cohort.cohort} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{cohort.cohort}</h3>
                          <p className="text-sm text-gray-600">
                            {cohort.size} users • {cohort.acquisition_channel}
                          </p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">
                          ${cohort.avg_revenue} avg revenue
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{cohort.retention_1m}%</div>
                          <div className="text-xs text-gray-500">1 Month</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{cohort.retention_3m}%</div>
                          <div className="text-xs text-gray-500">3 Months</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">{cohort.retention_6m}%</div>
                          <div className="text-xs text-gray-500">6 Months</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-orange-600">{cohort.retention_12m}%</div>
                          <div className="text-xs text-gray-500">12 Months</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competitive">
          <div className="space-y-6">
            {/* Competitive Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Competitive Intelligence Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {competitorData.map((competitor) => (
                    <div key={competitor.competitor} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{competitor.competitor}</h3>
                          <p className="text-sm text-gray-600">{competitor.pricing_position} pricing model</p>
                        </div>
                        <Badge className={
                          competitor.growth_rate > 20 ? 'bg-red-100 text-red-800' :
                          competitor.growth_rate > 15 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {competitor.growth_rate}% growth
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Market Share</div>
                          <div className="font-bold">{competitor.market_share}%</div>
                          <Progress value={competitor.market_share} className="mt-1" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Feature Score</div>
                          <div className="font-bold">{competitor.feature_score}/100</div>
                          <Progress value={competitor.feature_score} className="mt-1" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Satisfaction</div>
                          <div className="font-bold">{competitor.customer_satisfaction}/5.0</div>
                          <Progress value={(competitor.customer_satisfaction / 5) * 100} className="mt-1" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Our Position</div>
                          <div className="font-bold text-blue-600">
                            {competitor.competitor === 'PlantNet' ? 'Better Features' :
                             competitor.competitor === 'iNaturalist' ? 'Specialized' :
                             'Premium Focus'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Share Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Market Share Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[
                          ...competitorData.map((comp, index) => ({
                            name: comp.competitor,
                            value: comp.market_share,
                            fill: COLORS[index]
                          })),
                          { name: 'OrchidAI', value: 18, fill: COLORS[3] },
                          { name: 'Others', value: 7, fill: COLORS[4] }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {competitorData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Competitive Positioning</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border-l-4 border-green-500 pl-3">
                      <div className="font-medium text-green-900">Our Advantages</div>
                      <div className="text-sm text-green-700">• Specialized orchid focus<br/>• Expert consultation network<br/>• Premium user experience</div>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-3">
                      <div className="font-medium text-yellow-900">Areas for Improvement</div>
                      <div className="text-sm text-yellow-700">• Market share growth<br/>• Free tier expansion<br/>• Mobile app features</div>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-3">
                      <div className="font-medium text-blue-900">Strategic Opportunities</div>
                      <div className="text-sm text-blue-700">• Partnership with garden centers<br/>• B2B market expansion<br/>• International markets</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="investment">
          <div className="space-y-6">
            {/* Investment ROI Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {investmentData.map((investment) => (
                <Card key={investment.category}>
                  <CardContent className="p-4">
                    <div className="text-center mb-3">
                      <Briefcase className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <h3 className="font-semibold">{investment.category}</h3>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Invested:</span>
                        <span className="font-medium">${investment.invested_amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Return:</span>
                        <span className="font-medium">${investment.actual_return.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">ROI:</span>
                        <span className={`font-bold ${
                          investment.roi_percentage > 100 ? 'text-green-600' :
                          investment.roi_percentage > 50 ? 'text-blue-600' :
                          'text-yellow-600'
                        }`}>
                          {investment.roi_percentage}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Payback:</span>
                        <span className="text-sm">{investment.payback_months} months</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Feature ROI Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Feature ROI Analysis & Prioritization</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={feature_roi_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="feature" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'ROI']} />
                    <Bar dataKey="roi" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="unit-economics">
          <div className="space-y-6">
            {/* Unit Economics Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Unit Economics Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={unit_economics_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cac" stroke="#EF4444" strokeWidth={2} name="CAC ($)" />
                    <Line type="monotone" dataKey="ltv" stroke="#10B981" strokeWidth={2} name="LTV ($)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* MRR/ARR Growth */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly & Annual Recurring Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mrr_arr_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, '']} />
                    <Area type="monotone" dataKey="arr" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} name="ARR" />
                    <Area type="monotone" dataKey="mrr" stackId="2" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="MRR" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">5.3x</div>
                    <div className="text-sm text-gray-600">LTV:CAC Ratio</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2.8</div>
                    <div className="text-sm text-gray-600">Payback Months</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">22%</div>
                    <div className="text-sm text-gray-600">MRR Growth Rate</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">$744K</div>
                    <div className="text-sm text-gray-600">Current ARR</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="strategic">
          <div className="space-y-6">
            {/* Strategic Decision Framework */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Partnership Opportunity Evaluation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { partner: 'Garden Centers Network', score: 92, type: 'Distribution', revenue_potential: 450000 },
                      { partner: 'Horticultural Universities', score: 78, type: 'R&D', revenue_potential: 120000 },
                      { partner: 'Plant Care Brands', score: 85, type: 'Product', revenue_potential: 280000 },
                      { partner: 'International Societies', score: 71, type: 'Market Expansion', revenue_potential: 650000 }
                    ].map((opportunity) => (
                      <div key={opportunity.partner} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{opportunity.partner}</span>
                          <Badge className={
                            opportunity.score >= 90 ? 'bg-green-500 text-white' :
                            opportunity.score >= 80 ? 'bg-blue-500 text-white' :
                            'bg-yellow-500 text-white'
                          }>
                            {opportunity.score}/100
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          {opportunity.type} • ${opportunity.revenue_potential.toLocaleString()} potential
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Market Expansion Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { market: 'European Union', readiness: 88, investment_needed: 250000, timeline: '6 months' },
                      { market: 'Australia & NZ', readiness: 75, investment_needed: 180000, timeline: '4 months' },
                      { market: 'Southeast Asia', readiness: 65, investment_needed: 320000, timeline: '8 months' },
                      { market: 'Latin America', readiness: 58, investment_needed: 280000, timeline: '10 months' }
                    ].map((market) => (
                      <div key={market.market} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{market.market}</span>
                          <span className="text-sm text-gray-600">{market.timeline}</span>
                        </div>
                        <Progress value={market.readiness} className="mb-2" />
                        <div className="text-sm text-gray-600">
                          {market.readiness}% market readiness • ${market.investment_needed.toLocaleString()} investment
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Exit Strategy Valuation */}
            <Card>
              <CardHeader>
                <CardTitle>Exit Strategy & Valuation Modeling</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center border rounded-lg p-4">
                    <Globe className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-blue-600">$12.5M</div>
                    <div className="text-sm font-medium">Strategic Acquisition</div>
                    <div className="text-xs text-gray-600">Revenue Multiple: 15x</div>
                  </div>

                  <div className="text-center border rounded-lg p-4">
                    <BarChart3 className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-green-600">$18.2M</div>
                    <div className="text-sm font-medium">Financial Buyer</div>
                    <div className="text-xs text-gray-600">EBITDA Multiple: 12x</div>
                  </div>

                  <div className="text-center border rounded-lg p-4">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold text-purple-600">$25.8M</div>
                    <div className="text-sm font-medium">IPO Valuation</div>
                    <div className="text-xs text-gray-600">Growth Multiple: 8x</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-900 mb-2">Valuation Drivers</div>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>• Recurring revenue model with strong retention</div>
                    <div>• Specialized market position with network effects</div>
                    <div>• Scalable AI technology with expanding moat</div>
                    <div>• Multiple monetization channels (B2C, B2B, partnerships)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OperationalInsightsDashboard;
