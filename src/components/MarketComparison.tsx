import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, ComposedChart } from 'recharts';
import { TrendingUp, IndianRupee, MapPin, Users, Target, Zap } from 'lucide-react';

interface MarketComparisonProps {
  yusufSaraiData: any;
  bengalData: any;
}

export const MarketComparison: React.FC<MarketComparisonProps> = ({ yusufSaraiData, bengalData }) => {
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const bengalPartial = bengalData.market_coverage.partial.length;
  const bengalFull = bengalData.market_coverage.covered.length;
  const bengalUncovered = bengalData.market_coverage.uncovered.length;
  const percentBengal = Math.abs((((bengalPartial/2) + bengalFull)/(bengalPartial+bengalFull+bengalUncovered))*100).toFixed(2)

  const yusufPartial = yusufSaraiData.market_coverage.partial.length;
  const yusufFull = yusufSaraiData.market_coverage.covered.length;
  const yusufUncovered = yusufSaraiData.market_coverage.uncovered.length;
  const percentYusuf = Math.abs((((yusufPartial/2) + bengalFull)/(yusufPartial+yusufFull+yusufUncovered))*100).toFixed(2)
  

  // Prepare comparison data
  const revenueComparison = [
    {
      market: 'Yusuf Sarai',
      currentRevenue: 0,
      projectedAnnual: yusufSaraiData.revenue_opportunity.annual_revenue,
      monthlyRevenue: yusufSaraiData.revenue_opportunity.monthly_revenue,
      dailyFootfall: yusufSaraiData.revenue_opportunity.daily_footfall,
    },
    {
      market: 'Baruipur',
      currentRevenue: bengalData.revenue_opportunity.annual_revenue * 0.1, // Assuming 10% current
      projectedAnnual: bengalData.revenue_opportunity.annual_revenue,
      monthlyRevenue: bengalData.revenue_opportunity.monthly_revenue,
      dailyFootfall: bengalData.revenue_opportunity.footfall_per_day,
    },
  ];

  const marketShareComparison = [
    {
      market: 'Yusuf Sarai',
      currentShare: 1,
      projectedShare: 17.5,
      uncoveredAreas: yusufSaraiData.market_coverage.uncovered.length,
      coveredAreas: yusufSaraiData.market_coverage.covered.length,
    },
    {
      market: 'Baruipur',
      currentShare: 9,
      projectedShare: 22.5,
      uncoveredAreas: bengalData.market_coverage.uncovered.length,
      coveredAreas: bengalData.market_coverage.covered.length,
    },
  ];

  const investmentComparison = [
    {
      market: 'Yusuf Sarai',
      initialInvestment: 500000,
      breakEvenMonths: 6,
      roiYear1: 260,
      riskLevel: 'Medium',
    },
    {
      market: 'Baruipur',
      initialInvestment: 750000,
      breakEvenMonths: 4,
      roiYear1: 336,
      riskLevel: 'Low',
    },
  ];

  const strategicMetrics = [
    {
      metric: 'Market Maturity',
      yusufSarai: 'High Competition',
      baruipur: 'Emerging Market',
      advantage: 'Baruipur',
    },
    {
      metric: 'Revenue Potential',
      yusufSarai: '₹18L Annual',
      baruipur: '₹25L Annual',
      advantage: 'Baruipur',
    },
    {
      metric: 'Market Entry Ease',
      yusufSarai: 'Moderate',
      baruipur: 'Easy',
      advantage: 'Baruipur',
    },
    {
      metric: 'Brand Recognition',
      yusufSarai: 'High',
      baruipur: 'Medium',
      advantage: 'Yusuf Sarai',
    },
  ];

  const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-8">
      {/* Executive Summary */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Target className="h-6 w-6 mr-2 text-green-600" />
          Market Expansion Comparison: Delhi vs West Bengal
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Investment Recommendation</h3>
            <p className="text-lg font-bold text-green-600 mb-1">Baruipur Priority</p>
            <p className="text-sm text-gray-600">Higher ROI, lower competition, faster break-even</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Combined Potential</h3>
            <p className="text-lg font-bold text-blue-600 mb-1">₹43L Annual</p>
            <p className="text-sm text-gray-600">Total revenue from both markets</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Strategic Advantage</h3>
            <p className="text-lg font-bold text-purple-600 mb-1">Dual Geography</p>
            <p className="text-sm text-gray-600">Risk diversification across regions</p>
          </div>
        </div>
      </div>

      {/* Revenue & Financial Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <IndianRupee className="h-5 w-5 mr-2 text-green-600" />
            Revenue Potential Comparison
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="market" />
              <YAxis tickFormatter={(value) => `₹${value / 100000}L`} />
              <Tooltip formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="projectedAnnual" fill="#22c55e" name="Projected Annual" />
              <Bar dataKey="currentRevenue" fill="#ef4444" name="Current Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-blue-600" />
            Market Share Growth Potential
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={marketShareComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="market" />
              <YAxis />
              <Tooltip formatter={(value: any) => [`${value}%`, 'Market Share']} />
              <Bar dataKey="currentShare" fill="#ef4444" name="Current Share" />
              <Bar dataKey="projectedShare" fill="#22c55e" name="Projected Share" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Investment Analysis */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
          Investment & ROI Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {investmentComparison.map((investment, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">{investment.market}</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Investment:</span>
                  <span className="text-sm font-medium">₹{investment.initialInvestment / 100000}L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Break-even:</span>
                  <span className="text-sm font-medium">{investment.breakEvenMonths} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">ROI Year 1:</span>
                  <span className="text-sm font-medium text-green-600">{investment.roiYear1}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Risk Level:</span>
                  <span className={`text-sm font-medium ${
                    investment.riskLevel === 'Low' ? 'text-green-600' : 
                    investment.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {investment.riskLevel}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Combined Investment Summary */}
          <div className="border-2 border-green-200 bg-green-50 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-3">Combined Investment</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-green-700">Total Investment:</span>
                <span className="text-sm font-medium text-green-900">₹12.5L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-700">Combined Revenue:</span>
                <span className="text-sm font-medium text-green-900">₹43L/year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-700">Portfolio ROI:</span>
                <span className="text-sm font-medium text-green-900">344%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-700">Risk Profile:</span>
                <span className="text-sm font-medium text-green-900">Diversified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Comparison Matrix */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Zap className="h-5 w-5 mr-2 text-orange-600" />
          Strategic Comparison Matrix
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Metric</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900">Yusuf Sarai</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900">Baruipur</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900">Advantage</th>
              </tr>
            </thead>
            <tbody>
              {strategicMetrics.map((metric, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{metric.metric}</td>
                  <td className="py-3 px-4 text-center text-gray-700">{metric.yusufSarai}</td>
                  <td className="py-3 px-4 text-center text-gray-700">{metric.baruipur}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      metric.advantage === 'Baruipur' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {metric.advantage}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Market Coverage Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Yusuf Sarai Market Coverage</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Covered Areas:</span>
              <span className="font-medium text-green-600">{yusufSaraiData.market_coverage.covered.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Uncovered Areas:</span>
              <span className="font-medium text-red-600">{yusufSaraiData.market_coverage.uncovered.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Partially Covered Areas:</span>
              <span className="font-medium text-red-600">{yusufSaraiData.market_coverage.partial.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Coverage Ratio:</span>
              <span className="font-medium text-blue-600">
                {percentYusuf}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Baruipur Market Coverage</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Covered Areas:</span>
              <span className="font-medium text-green-600">{bengalData.market_coverage.covered.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Uncovered Areas:</span>
              <span className="font-medium text-red-600">{bengalData.market_coverage.uncovered.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Partially Covered Areas:</span>
              <span className="font-medium text-red-600">{bengalData.market_coverage.partial.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Coverage Ratio:</span>
              <span className="font-medium text-blue-600">
                {percentBengal}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Recommendations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm mr-2">1</span>
              Phase 1: Baruipur Launch
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Lower competition and higher ROI</li>
              <li>• Faster market penetration</li>
              <li>• Establish strong foundation</li>
              <li>• Timeline: 0-6 months</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm mr-2">2</span>
              Phase 2: Yusuf Sarai Entry
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Leverage Baruipur success</li>
              <li>• Premium market positioning</li>
              <li>• Strategic partnerships</li>
              <li>• Timeline: 6-12 months</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm mr-2">3</span>
              Phase 3: Optimization
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Cross-market synergies</li>
              <li>• Shared resources and learnings</li>
              <li>• Scale operations</li>
              <li>• Timeline: 12+ months</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};