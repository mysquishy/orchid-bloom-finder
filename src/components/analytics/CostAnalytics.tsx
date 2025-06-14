
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { DollarSign, TrendingDown, Calculator, PiggyBank } from 'lucide-react';

interface CostAnalyticsProps {
  dateRange: { start: Date; end: Date };
}

const CostAnalytics: React.FC<CostAnalyticsProps> = ({ dateRange }) => {
  const monthlyCosts = [
    { month: 'Jan', fertilizer: 25, substrate: 0, tools: 15, plants: 45, total: 85 },
    { month: 'Feb', fertilizer: 20, substrate: 30, tools: 0, plants: 0, total: 50 },
    { month: 'Mar', fertilizer: 30, substrate: 0, tools: 25, plants: 60, total: 115 },
    { month: 'Apr', fertilizer: 25, substrate: 0, tools: 0, plants: 0, total: 25 },
    { month: 'May', fertilizer: 35, substrate: 40, tools: 0, plants: 80, total: 155 },
    { month: 'Jun', fertilizer: 30, substrate: 0, tools: 35, plants: 0, total: 65 }
  ];

  const costBreakdown = [
    { category: 'Fertilizers', amount: 165, percentage: 35, color: '#10b981' },
    { category: 'Plants', amount: 185, percentage: 39, color: '#3b82f6' },
    { category: 'Substrate/Potting', amount: 70, percentage: 15, color: '#f59e0b' },
    { category: 'Tools & Equipment', amount: 75, percentage: 16, color: '#8b5cf6' },
    { category: 'Treatments', amount: 25, percentage: 5, color: '#ef4444' }
  ];

  const costEfficiency = [
    { metric: 'Cost per Plant', value: 26.75, trend: '-8%', good: true },
    { metric: 'Monthly Average', value: 82.50, trend: '+12%', good: false },
    { metric: 'Care Cost Efficiency', value: 94, trend: '+5%', good: true },
    { metric: 'ROI on Blooms', value: 145, trend: '+15%', good: true }
  ];

  const budgetTracking = {
    monthly: 100,
    spent: 82.50,
    remaining: 17.50,
    projected: 95
  };

  const chartConfig = {
    total: { label: "Total Cost", color: "#8b5cf6" },
    fertilizer: { label: "Fertilizer", color: "#10b981" },
    substrate: { label: "Substrate", color: "#f59e0b" },
    tools: { label: "Tools", color: "#3b82f6" },
    plants: { label: "Plants", color: "#ef4444" }
  };

  return (
    <div className="space-y-6">
      {/* Monthly Cost Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Monthly Spending Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px]">
            <BarChart data={monthlyCosts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="fertilizer" stackId="a" fill="#10b981" />
              <Bar dataKey="substrate" stackId="a" fill="#f59e0b" />
              <Bar dataKey="tools" stackId="a" fill="#3b82f6" />
              <Bar dataKey="plants" stackId="a" fill="#ef4444" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Cost Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <PieChart>
                <Pie
                  data={costBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Budget Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="w-5 h-5" />
              Budget Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Monthly Budget</span>
                <span className="text-lg font-bold text-gray-900">${budgetTracking.monthly}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Spent</span>
                  <span>${budgetTracking.spent}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: `${(budgetTracking.spent / budgetTracking.monthly) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm font-medium text-green-600">Remaining</span>
                <span className="text-lg font-bold text-green-600">${budgetTracking.remaining}</span>
              </div>
              
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-sm text-yellow-800">
                  <strong>Projection:</strong> You're on track to spend ${budgetTracking.projected} this month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Efficiency Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Cost Efficiency Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {costEfficiency.map((metric, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">{metric.metric}</h4>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-gray-900">
                    {metric.metric.includes('Cost') || metric.metric.includes('Average') ? '$' : ''}{metric.value}
                    {metric.metric.includes('Efficiency') || metric.metric.includes('ROI') ? '%' : ''}
                  </div>
                  <div className={`text-sm font-medium ${metric.good ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Spending Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">💰 Cost Savings</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Buy fertilizer in bulk to save 15-20%</li>
                <li>• Consider DIY potting mix for substrate savings</li>
                <li>• Track seasonal sales for plant purchases</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">📊 Optimization Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Focus spending on high-impact care items</li>
                <li>• Review tool purchases - good ROI so far</li>
                <li>• Consider cost per bloom when evaluating success</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostAnalytics;
