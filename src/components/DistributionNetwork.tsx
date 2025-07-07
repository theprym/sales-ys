import React, { useState } from 'react';
import { Store, Users, TrendingUp, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DistributionNetworkProps {
  data: any;
  marketName?: string;
}

export const DistributionNetwork: React.FC<DistributionNetworkProps> = ({ data, marketName }) => {
  const [selectedInfluencer, setSelectedInfluencer] = useState<string | null>(null);

  const influenceColors = {
    'Very High': '#22c55e',
    'High': '#3b82f6',
    'Medium–High': '#f59e0b',
    'Medium': '#ef4444',
  };

  const getInfluenceColor = (influence: string) => {
    return influenceColors[influence as keyof typeof influenceColors] || '#6b7280';
  };

  // Handle different data structures between markets
  const totalStores = data.distributor_performance?.total_stores || 
                     data.distributor_performance?.stores?.length || 
                     data.dealer_performance?.length || 0;
  
  const averageUnits = data.distributor_performance?.average_units || 
                      data.distributor_performance?.average || 155;

  const distributorName = data.distributor_performance?.distributor || 'Primary Distributor';

  // Prepare performance data
  const performanceData = data.distributor_performance?.area_performance || 
                         data.distributor_performance?.stores?.map((store: any) => ({
                           area: store.location,
                           stores: 1,
                           avg_store: store.avg,
                           total: store.avg,
                         })) || [];

  const dealerData = data.dealer_performance?.map((dealer: any) => ({
    name: dealer.dealer,
    units: dealer.units,
    area: dealer.area,
  })) || [];

  // Handle cross-sell opportunities - different structures
  const crossSellOpportunities = Array.isArray(data.cross_sell_opportunities) 
    ? data.cross_sell_opportunities.filter((item: any) => typeof item === 'string')
    : data.cross_sell_opportunities?.map((item: any) => item.product) || [];

  return (
    <div className="space-y-8">
      {/* Market Context */}
      {marketName && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">{marketName} Distribution Network</h2>
          <p className="text-sm text-gray-600">
            Current distribution performance and expansion opportunities
          </p>
        </div>
      )}

      {/* Distribution Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Store className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{totalStores}</p>
              <p className="text-sm text-gray-500">Total Stores</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="bg-green-50 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{averageUnits}</p>
              <p className="text-sm text-gray-500">Avg Units/Store</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="bg-purple-50 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{data.influencers?.types?.length || 0}</p>
              <p className="text-sm text-gray-500">Influencer Types</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="bg-orange-50 p-3 rounded-lg">
              <MapPin className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{crossSellOpportunities.length}</p>
              <p className="text-sm text-gray-500">Cross-sell Items</p>
            </div>
          </div>
        </div>
      </div>

      {/* Area Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Area Performance - {distributorName}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="area" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value: any, name: string) => [
                name === 'avg_store' ? `${value} units` : value,
                name === 'avg_store' ? 'Avg per Store' : name === 'stores' ? 'Stores' : 'Total Units'
              ]} />
              <Bar dataKey="avg_store" fill="#22c55e" name="Avg per Store" />
              {performanceData[0]?.stores && <Bar dataKey="stores" fill="#3b82f6" name="Number of Stores" />}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Dealer Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dealerData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip formatter={(value: any) => [`${value} units`, 'Units Sold']} />
              <Bar dataKey="units" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Influencer Network */}
      {data.influencers?.types && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Influencer Network</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.influencers.types.map((influencer: any, index: number) => (
              <div
                key={index}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedInfluencer === influencer.type
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedInfluencer(selectedInfluencer === influencer.type ? null : influencer.type)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{influencer.type}</h4>
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: getInfluenceColor(influencer.influence) }}
                  ></div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  {influencer.influence ? `Influence: ${influencer.influence}` : ''}
                </p>
                <p className="text-xs text-gray-500">
                  {influencer.locations?.length || influencer.hotspots?.length || 0} locations
                </p>
                {influencer.strategy && (
                  <p className="text-xs text-blue-600 mt-2">{influencer.strategy}</p>
                )}
              </div>
            ))}
          </div>

          {selectedInfluencer && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{selectedInfluencer} - Key Locations</h4>
              <div className="flex flex-wrap gap-2">
                {data.influencers.types
                  .find((inf: any) => inf.type === selectedInfluencer)
                  ?.locations?.map((location: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
                    >
                      {location}
                    </span>
                  )) ||
                  data.influencers.types
                    .find((inf: any) => inf.type === selectedInfluencer)
                    ?.hotspots?.map((hotspot: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
                      >
                        {hotspot}
                      </span>
                    ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Performance Issues & Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data.distributor_performance?.low_performers && (
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              Low Performing Areas
            </h3>
            <div className="space-y-3">
              {data.distributor_performance.low_performers.map((performer: any, index: number) => (
                <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900">{performer.area}</h4>
                    <span className="text-sm text-red-600 font-medium">{performer.avg_store} units/store</span>
                  </div>
                  {performer.stores && (
                    <p className="text-sm text-gray-600">{performer.stores} store(s)</p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-red-50 rounded-lg">
              <h5 className="font-medium text-red-900 mb-1">Improvement Opportunities</h5>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Increase dealer support and training</li>
                <li>• Implement targeted promotional campaigns</li>
                <li>• Review pricing and inventory strategies</li>
              </ul>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            Cross-sell Opportunities
          </h3>
          <div className="space-y-2">
            {crossSellOpportunities.map((opportunity: string, index: number) => (
              <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">{opportunity}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <h5 className="font-medium text-green-900 mb-1">Revenue Potential</h5>
            <p className="text-sm text-green-700">
              Cross-selling these products could increase average transaction value by 25-40%
            </p>
          </div>
        </div>
      </div>

      {/* Network Expansion Strategy */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Expansion Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2">Phase 1: Strengthen Existing</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Support low-performing dealers</li>
              <li>• Optimize inventory management</li>
              <li>• Enhance dealer training programs</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2">Phase 2: Strategic Expansion</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Target new market entry</li>
              <li>• Establish key partnerships</li>
              <li>• Launch promotional campaigns</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2">Phase 3: Market Dominance</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Scale successful strategies</li>
              <li>• Implement cross-selling programs</li>
              <li>• Achieve 15-20% market share</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};