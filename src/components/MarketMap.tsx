import React, { useState } from 'react';
import { MapPin, Navigation, Zap } from 'lucide-react';

interface MarketMapProps {
  data: any;
}

export const MarketMap: React.FC<MarketMapProps> = ({ data }) => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  // Mock coordinates for Delhi areas (in a real app, you'd use actual coordinates)
  const areaCoordinates = {
    'Defence Colony': { x: 45, y: 60, status: 'covered' },
    'Lajpat Nagar': { x: 55, y: 65, status: 'covered' },
    'Greater Kailash': { x: 40, y: 70, status: 'covered' },
    'Hauz Khas / AIIMS': { x: 35, y: 55, status: 'covered' },
    'Sarojini Nagar': { x: 25, y: 50, status: 'uncovered' },
    'Lodhi Colony': { x: 30, y: 45, status: 'uncovered' },
    'South Extension I & II': { x: 35, y: 65, status: 'partial' },
    'Green Park Extension': { x: 30, y: 60, status: 'partial' },
    'Yusuf Sarai': { x: 32, y: 52, status: 'uncovered', highlight: true },
    'Netaji Nagar': { x: 28, y: 58, status: 'uncovered' },
    'Andrews Ganj': { x: 38, y: 62, status: 'uncovered' },
    'Sewa Nagar / Lodi Road': { x: 33, y: 48, status: 'uncovered' },
    'Okhla Phase I Edge': { x: 60, y: 70, status: 'uncovered' },
    'Panchsheel / Shahpur Jat': { x: 42, y: 58, status: 'uncovered' },
  };

  const getStatusColor = (status: string, highlight?: boolean) => {
    if (highlight) return 'bg-yellow-500 border-yellow-600 animate-pulse';
    switch (status) {
      case 'covered': return 'bg-green-500 border-green-600';
      case 'partial': return 'bg-yellow-500 border-yellow-600';
      case 'uncovered': return 'bg-red-500 border-red-600';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  const getAreaData = (areaName: string) => {
    const covered = data.market_coverage.covered.find((area: any) => area.area === areaName);
    const uncovered = data.market_coverage.uncovered.find((area: any) => area.area === areaName);
    return covered || uncovered;
  };

  return (
    <div className="space-y-8">
      {/* Map Legend */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Navigation className="h-5 w-5 mr-2 text-blue-600" />
          Market Coverage Map - South Delhi
        </h3>
        
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-green-600"></div>
            <span className="text-sm text-gray-700">Covered Areas</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-yellow-600"></div>
            <span className="text-sm text-gray-700">Partially Covered</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-red-600"></div>
            <span className="text-sm text-gray-700">Expansion Opportunities</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-yellow-600 animate-pulse"></div>
            <span className="text-sm text-gray-700">Yusuf Sarai (Target)</span>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 min-h-96">
          <svg viewBox="0 0 100 100" className="w-full h-96">
            {/* Area markers */}
            {Object.entries(areaCoordinates).map(([areaName, coords]) => (
              <g key={areaName}>
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r="3"
                  className={`${getStatusColor(coords.status, coords.highlight)} cursor-pointer transition-all duration-200 hover:scale-110`}
                  onClick={() => setSelectedArea(areaName)}
                />
                <text
                  x={coords.x}
                  y={coords.y - 5}
                  textAnchor="middle"
                  className="text-xs fill-gray-700 font-medium pointer-events-none"
                  style={{ fontSize: '2px' }}
                >
                  {areaName.split(' ')[0]}
                </text>
              </g>
            ))}
            
            {/* Coverage zones */}
            <defs>
              <radialGradient id="coveredGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(34, 197, 94, 0.3)" />
                <stop offset="100%" stopColor="rgba(34, 197, 94, 0.1)" />
              </radialGradient>
              <radialGradient id="uncoveredGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(239, 68, 68, 0.3)" />
                <stop offset="100%" stopColor="rgba(239, 68, 68, 0.1)" />
              </radialGradient>
            </defs>
            
            {/* Coverage circles */}
            {Object.entries(areaCoordinates).map(([areaName, coords]) => (
              <circle
                key={`coverage-${areaName}`}
                cx={coords.x}
                cy={coords.y}
                r="8"
                fill={coords.status === 'covered' ? 'url(#coveredGradient)' : 'url(#uncoveredGradient)'}
                className="pointer-events-none"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Area Details */}
      {selectedArea && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-blue-600" />
            {selectedArea} - Area Details
          </h3>
          
          {(() => {
            const areaData = getAreaData(selectedArea);
            if (!areaData) return null;
            
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Status</h4>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    areaData.status === 'Covered' 
                      ? 'bg-green-100 text-green-800'
                      : areaData.status === 'Partially Covered'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {areaData.status}
                  </span>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {areaData.notes ? 'Current Situation' : 'Opportunity'}
                    </h4>
                    <p className="text-gray-600">{areaData.notes || areaData.opportunity}</p>
                  </div>
                </div>
                
                {selectedArea === 'Yusuf Sarai' && (
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h4 className="font-medium text-yellow-900 mb-2 flex items-center">
                      <Zap className="h-4 w-4 mr-1" />
                      Primary Target Area
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Daily Footfall:</strong> {data.revenue_opportunity.daily_footfall}</p>
                      <p><strong>Monthly Revenue Potential:</strong> ₹{(data.revenue_opportunity.monthly_revenue / 100000).toFixed(1)}L</p>
                      <p><strong>Annual Revenue Potential:</strong> ₹{(data.revenue_opportunity.annual_revenue / 100000).toFixed(1)}L</p>
                      <p><strong>Market Share Impact:</strong> {data.market_share_impact.after.local_share}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* Strategic Locations */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Strategic Locations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.recommended_locations.map((location: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{location.location}</h4>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {location.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{location.benefit}</p>
              <button
                onClick={() => setSelectedArea(location.location)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View on Map →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};