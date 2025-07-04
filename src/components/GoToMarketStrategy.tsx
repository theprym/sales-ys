import React, { useState } from 'react';
import { Target, Zap, Users, Smartphone } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface GoToMarketStrategyProps {
  data: any;
}

export const GoToMarketStrategy: React.FC<GoToMarketStrategyProps> = ({ data }) => {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

  const strategyIcons = {
    'Battery Camps': Target,
    'Workshop Partnerships': Users,
    'Digital + WhatsApp': Smartphone,
    'Van + Roadshows': Zap,
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'Low': return 'text-green-600 bg-green-50';
      case 'Low-Med': return 'text-yellow-600 bg-yellow-50';
      case 'Med–High': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getImpactColor = (impact: number) => {
    if (impact >= 4) return 'text-green-600';
    if (impact >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Prepare data for radar chart
  const radarData = data.promotions.methods.map((method: any) => ({
    method: method.method.split(' ')[0], // Shortened name for chart
    impact: method.impact,
    costEfficiency: method.cost === 'Low' ? 5 : method.cost === 'Low-Med' ? 4 : method.cost === 'Med–High' ? 2 : 3,
  }));

  return (
    <div className="space-y-8">
      {/* Strategy Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Target className="h-5 w-5 mr-2 text-green-600" />
          Go-to-Market Strategy Matrix
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.promotions.methods.map((method: any, index: number) => {
            const IconComponent = strategyIcons[method.method as keyof typeof strategyIcons] || Target;
            return (
              <div
                key={index}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedStrategy === method.method
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedStrategy(selectedStrategy === method.method ? null : method.method)}
              >
                <div className="flex items-center justify-between mb-3">
                  <IconComponent className="h-6 w-6 text-green-600" />
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < method.impact ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <h4 className="font-medium text-gray-900 mb-2">{method.method}</h4>
                
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${getCostColor(method.cost)}`}>
                    {method.cost} Cost
                  </span>
                  <span className={`text-sm font-medium ${getImpactColor(method.impact)}`}>
                    Impact: {method.impact}/5
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strategy Details */}
      {selectedStrategy && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {selectedStrategy} - Implementation Details
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Strategy Overview</h4>
              {selectedStrategy === 'Battery Camps' && (
                <div className="space-y-3">
                  <p className="text-gray-600">Set up temporary battery testing and replacement camps in high-traffic areas.</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Mobile testing units with diagnostic equipment</li>
                    <li>On-spot battery replacement services</li>
                    <li>Free battery health check-ups</li>
                    <li>Promotional pricing for immediate purchases</li>
                  </ul>
                </div>
              )}
              {selectedStrategy === 'Workshop Partnerships' && (
                <div className="space-y-3">
                  <p className="text-gray-600">Partner with local auto workshops and service centers for battery distribution.</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Exclusive partnership agreements</li>
                    <li>Mechanic training and certification programs</li>
                    <li>Co-branded service offerings</li>
                    <li>Referral incentive programs</li>
                  </ul>
                </div>
              )}
              {selectedStrategy === 'Digital + WhatsApp' && (
                <div className="space-y-3">
                  <p className="text-gray-600">Leverage digital platforms and WhatsApp for customer acquisition and service.</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>WhatsApp Business for customer support</li>
                    <li>Google My Business optimization</li>
                    <li>Social media marketing campaigns</li>
                    <li>Online booking and scheduling system</li>
                  </ul>
                </div>
              )}
              {selectedStrategy === 'Van + Roadshows' && (
                <div className="space-y-3">
                  <p className="text-gray-600">Mobile service vans for door-to-door battery services and brand awareness.</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Branded mobile service vehicles</li>
                    <li>Door-to-door battery replacement</li>
                    <li>Community engagement events</li>
                    <li>Fleet service partnerships</li>
                  </ul>
                </div>
              )}
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Implementation Timeline</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">1</div>
                  <div>
                    <p className="font-medium text-gray-900">Week 1-2: Setup & Preparation</p>
                    <p className="text-sm text-gray-600">Resource allocation and initial setup</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-medium text-green-600">2</div>
                  <div>
                    <p className="font-medium text-gray-900">Week 3-4: Launch Phase</p>
                    <p className="text-sm text-gray-600">Initial rollout in target areas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-medium text-purple-600">3</div>
                  <div>
                    <p className="font-medium text-gray-900">Month 2-3: Scale & Optimize</p>
                    <p className="text-sm text-gray-600">Expand coverage and optimize operations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Strategy Comparison Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact vs Cost Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.promotions.methods}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="method" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="impact" fill="#22c55e" name="Impact Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategy Effectiveness Radar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="method" />
              <PolarRadiusAxis angle={90} domain={[0, 5]} />
              <Radar name="Impact" dataKey="impact" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
              <Radar name="Cost Efficiency" dataKey="costEfficiency" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Promotional Areas */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Promotional Areas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.promotions.top_areas.map((area: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{area.location}</h4>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  Priority {index + 1}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{area.type}</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500">High conversion potential</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Roadmap */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">90-Day Implementation Roadmap</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2">Month 1: Foundation</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Set up battery camps in Yusuf Sarai</li>
              <li>• Establish workshop partnerships</li>
              <li>• Launch WhatsApp Business</li>
              <li>• Initial brand awareness campaigns</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2">Month 2: Expansion</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Scale to adjacent areas</li>
              <li>• Launch mobile van services</li>
              <li>• Optimize digital presence</li>
              <li>• Measure and adjust strategies</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2">Month 3: Optimization</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Full market penetration</li>
              <li>• Customer retention programs</li>
              <li>• Performance analytics review</li>
              <li>• Plan for next phase expansion</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};