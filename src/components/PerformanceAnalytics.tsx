import React, { useState } from 'react';
import { BarChart3, TrendingUp, Target, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar } from 'recharts';

interface PerformanceAnalyticsProps {
  data: any;
}

export const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({ data }) => {
  const [timeframe, setTimeframe] = useState('12months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Generate projected performance data
  const generateProjectedData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const baseRevenue = data.revenue_opportunity.monthly_revenue;
    
    return months.map((month, index) => {
      const growthFactor = Math.min(1, (index + 1) * 0.15); // Gradual growth over time
      const seasonalFactor = 1 + (Math.sin((index * Math.PI) / 6) * 0.1); // Seasonal variation
      
      return {
        month,
        currentRevenue: index < 6 ? 0 : baseRevenue * growthFactor * seasonalFactor * 0.3, // Start from month 6
        projectedRevenue: baseRevenue * growthFactor * seasonalFactor,
        marketShare: Math.min(20, (index + 1) * 1.5),
        customerAcquisition: Math.round(50 + (index * 15) + (Math.random() * 20)),
        batterysSold: Math.round((baseRevenue * growthFactor * seasonalFactor) / 5000),
      };
    });
  };

  const performanceData = generateProjectedData();

  // KPI calculations
  const totalProjectedRevenue = performanceData.reduce((sum, month) => sum + month.projectedRevenue, 0);
  const avgMonthlyGrowth = 15; // 15% average monthly growth
  const customerRetentionRate = 85; // 85% retention rate
  const avgTransactionValue = data.revenue_opportunity.battery_price;

  const kpis = [
    {
      title: 'Projected Annual Revenue',
      value: `₹${Math.round(totalProjectedRevenue / 100000)}L`,
      change: '+180%',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Market Share Target',
      value: '18%',
      change: '+17%',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Monthly Growth Rate',
      value: `${avgMonthlyGrowth}%`,
      change: 'Projected',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Customer Retention',
      value: `${customerRetentionRate}%`,
      change: 'Target',
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const metricOptions = [
    { id: 'revenue', label: 'Revenue', color: '#22c55e' },
    { id: 'marketShare', label: 'Market Share', color: '#3b82f6' },
    { id: 'customers', label: 'Customer Acquisition', color: '#f59e0b' },
    { id: 'units', label: 'Units Sold', color: '#ef4444' },
  ];

  const getChartData = () => {
    switch (selectedMetric) {
      case 'revenue':
        return performanceData.map(d => ({ ...d, value: d.projectedRevenue }));
      case 'marketShare':
        return performanceData.map(d => ({ ...d, value: d.marketShare }));
      case 'customers':
        return performanceData.map(d => ({ ...d, value: d.customerAcquisition }));
      case 'units':
        return performanceData.map(d => ({ ...d, value: d.batterysSold }));
      default:
        return performanceData.map(d => ({ ...d, value: d.projectedRevenue }));
    }
  };

  return (
    <div className="space-y-8">
      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className={`${kpi.bgColor} p-3 rounded-lg`}>
                <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
              </div>
              <span className={`text-sm font-medium ${kpi.color}`}>{kpi.change}</span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              <p className="text-sm text-gray-500">{kpi.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart Controls */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-gray-900">Performance Projections</h3>
          
          <div className="flex space-x-4">
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {metricOptions.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
            
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="6months">6 Months</option>
              <option value="12months">12 Months</option>
              <option value="24months">24 Months</option>
            </select>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={getChartData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value: any, name: string) => {
                if (selectedMetric === 'revenue') return [`₹${value.toLocaleString()}`, 'Revenue'];
                if (selectedMetric === 'marketShare') return [`${value}%`, 'Market Share'];
                return [value, name];
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              fill={metricOptions.find(m => m.id === selectedMetric)?.color || '#22c55e'}
              fillOpacity={0.3}
              stroke={metricOptions.find(m => m.id === selectedMetric)?.color || '#22c55e'}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={metricOptions.find(m => m.id === selectedMetric)?.color || '#22c55e'}
              strokeWidth={3}
              dot={{ fill: metricOptions.find(m => m.id === selectedMetric)?.color || '#22c55e', strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Comparative Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue vs Investment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={performanceData.slice(0, 6)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: any) => [`₹${value.toLocaleString()}`, '']} />
              <Bar dataKey="currentRevenue" fill="#ef4444" name="Current Revenue" />
              <Line type="monotone" dataKey="projectedRevenue" stroke="#22c55e" strokeWidth={3} name="Projected Revenue" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Share Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: any) => [`${value}%`, 'Market Share']} />
              <Area type="monotone" dataKey="marketShare" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Benchmarks */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Benchmarks</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Revenue Growth</h4>
            <p className="text-2xl font-bold text-green-600 mb-1">180%</p>
            <p className="text-sm text-gray-500">Year-over-year projected</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Market Penetration</h4>
            <p className="text-2xl font-bold text-blue-600 mb-1">18%</p>
            <p className="text-sm text-gray-500">Local market share target</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">ROI Timeline</h4>
            <p className="text-2xl font-bold text-purple-600 mb-1">6 Months</p>
            <p className="text-sm text-gray-500">Break-even projection</p>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-gradient-to-r from-yellow-50 to-red-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment & Mitigation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Identified Risks</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Competition from established players</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Seasonal demand fluctuations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Supply chain disruptions</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Mitigation Strategies</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Differentiated service offerings</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Diversified promotional strategies</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Strong distributor partnerships</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};