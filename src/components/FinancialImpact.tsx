import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Target, IndianRupee } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface FinancialImpactProps {
  data: any;
}

export const FinancialImpact: React.FC<FinancialImpactProps> = ({ data }) => {
  const [footfall, setFootfall] = useState(data.revenue_opportunity.daily_footfall);
  const [conversionRate, setConversionRate] = useState(data.revenue_opportunity.conversion_rate_monthly * 100);
  const [batteryPrice, setBatteryPrice] = useState(data.revenue_opportunity.battery_price);

  // Calculate dynamic metrics
  const monthlyCustomers = Math.round((footfall * 30 * conversionRate) / 100);
  const monthlyRevenue = monthlyCustomers * batteryPrice * .1;
  const annualRevenue = monthlyRevenue * 12;

  const revenueComparison = [
    { name: 'Current', value: 0, color: '#ef4444' },
    { name: 'Projected', value: annualRevenue, color: '#22c55e' },
  ];

  const marketShareData = [
    { name: 'Current Share', value: 1, color: '#ef4444' },
    { name: 'Projected Share', value: 17.5, color: '#22c55e' },
    { name: 'Remaining Market', value: 81.5, color: '#e5e7eb' },
  ];

  const roiTimeline = [
    { month: 'Month 1', investment: -500000, revenue: monthlyRevenue * 0.3, profit: (monthlyRevenue * 0.3) - 500000 },
    { month: 'Month 3', investment: -500000, revenue: monthlyRevenue * 0.6, profit: (monthlyRevenue * 0.6 * 3) - 500000 },
    { month: 'Month 6', investment: -500000, revenue: monthlyRevenue * 0.8, profit: (monthlyRevenue * 0.8 * 6) - 500000 },
    { month: 'Month 12', investment: -500000, revenue: monthlyRevenue, profit: (monthlyRevenue * 12) - 500000 },
  ];

  return (
    <div className="space-y-8">
      {/* Financial Calculator */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Calculator className="h-5 w-5 mr-2 text-green-600" />
          Revenue Calculator
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Controls */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Footfall
              </label>
              <input
                type="range"
                min="100"
                max="1000"
                value={footfall}
                onChange={(e) => setFootfall(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>100</span>
                <span className="font-medium text-gray-900">{footfall}</span>
                <span>1000</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Conversion Rate (%)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1%</span>
                <span className="font-medium text-gray-900">{conversionRate}%</span>
                <span>10%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average Battery Price (₹)
              </label>
              <input
                type="range"
                min="3000"
                max="8000"
                step="100"
                value={batteryPrice}
                onChange={(e) => setBatteryPrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>₹3,000</span>
                <span className="font-medium text-gray-900">₹{batteryPrice.toLocaleString()}</span>
                <span>₹8,000</span>
              </div>
            </div>
          </div>

          {/* Output Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <Target className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-blue-900">{monthlyCustomers}</span>
              </div>
              <p className="text-sm text-blue-700 mt-2">Monthly Customers</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <IndianRupee className="h-8 w-8 text-green-600" />
                <span className="text-2xl font-bold text-green-900">₹{Math.abs(monthlyRevenue/100000)}L</span>
              </div>
              <p className="text-sm text-green-700 mt-2">Monthly Revenue</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <span className="text-2xl font-bold text-purple-900">₹{Math.abs(annualRevenue / 100000)}L</span>
              </div>
              <p className="text-sm text-purple-700 mt-2">Annual Revenue</p>
            </div>

            {/* <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl">📈</span>
                <span className="text-2xl font-bold text-orange-900">{Math.abs((annualRevenue / 500000) * 100)}%</span>
              </div>
              <p className="text-sm text-orange-700 mt-2">ROI (Annual)</p>
            </div> */}
          </div>
        </div>
      </div>

      {/* Revenue Comparison Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `₹${value / 100000}L`} />
              <Tooltip formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="value" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Share Impact</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={marketShareData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {marketShareData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => [`${value}%`, 'Market Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {marketShareData.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROI Timeline */}
      {/* <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ROI Timeline Projection</h3>
        <h4 className="text-lg font-normal text-gray-400 mb-2">Assuming an investment of ₹500000</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={roiTimeline}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `₹${value / 100000}L`} />
            <Tooltip formatter={(value: any) => [`₹${value.toLocaleString()}`, '']} />
            <Bar dataKey="investment" fill="#ef4444" name="Investment" />
            <Bar dataKey="profit" fill="#22c55e" name="Cumulative Profit" />
          </BarChart>
        </ResponsiveContainer>
      </div> */}

      {/* Key Financial Insights */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Financial Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-900">Break-even Point</h4>
            <p className="text-2xl font-bold text-green-600 mt-1">4-6 months</p>
            <p className="text-sm text-gray-600">Based on current projections</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-900">Market Penetration</h4>
            <p className="text-2xl font-bold text-blue-600 mt-1">15-20%</p>
            <p className="text-sm text-gray-600">Local market share potential</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-900">Investment Required</h4>
            <p className="text-2xl font-bold text-purple-600 mt-1">₹5L</p>
            <p className="text-sm text-gray-600">Initial setup and inventory</p>
          </div>
        </div>
      </div>
    </div>
  );
};