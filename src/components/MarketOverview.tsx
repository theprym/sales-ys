import React from 'react';
import { MapPin, TrendingUp, Users, DollarSign, IndianRupee } from 'lucide-react';

interface MarketOverviewProps {
  data: any;
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({ data }) => {
  const coveredAreas = data.market_coverage.covered.length;
  const uncoveredAreas = data.market_coverage.uncovered.length;
  const totalAreas = coveredAreas + uncoveredAreas;
  const coveragePercentage = Math.round((coveredAreas / totalAreas) * 100);

  const keyMetrics = [
    {
      title: 'Market Coverage',
      value: `${coveragePercentage}%`,
      subtitle: `${coveredAreas}/${totalAreas} areas covered`,
      icon: MapPin,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Revenue Opportunity',
      value: '₹18L',
      subtitle: 'Annual potential in Yusuf Sarai',
      icon: IndianRupee,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Market Share Growth',
      value: '15-20%',
      subtitle: 'Projected local market share',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Daily Footfall',
      value: '500+',
      subtitle: 'Potential customers per day',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className={`${metric.bgColor} p-3 rounded-lg`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-sm text-gray-500">{metric.title}</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-400">{metric.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Market Coverage Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Covered Areas */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            Covered Areas ({coveredAreas})
          </h3>
          <div className="space-y-3">
            {data.market_coverage.covered.map((area: any, index: number) => (
              <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                <h4 className="font-medium text-gray-900">{area.area}</h4>
                <p className="text-sm text-gray-600">{area.notes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Uncovered Opportunities */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            Expansion Opportunities ({uncoveredAreas})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {data.market_coverage.uncovered.map((area: any, index: number) => (
              <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-900">{area.area}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    area.status === 'Not Covered' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {area.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{area.opportunity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategic Recommendations */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Expansion Locations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.recommended_locations.map((location: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{location.location}</h4>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  {location.type}
                </span>
              </div>
              <p className="text-sm text-gray-600">{location.benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};