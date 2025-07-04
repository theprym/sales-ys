import React, { useState } from 'react';
import { Header } from './components/Header';
import { MarketOverview } from './components/MarketOverview';
import { FinancialImpact } from './components/FinancialImpact';
import { MarketMap } from './components/MarketMap';
import { GoToMarketStrategy } from './components/GoToMarketStrategy';
import { DistributionNetwork } from './components/DistributionNetwork';
import { PerformanceAnalytics } from './components/PerformanceAnalytics';
import { ExportPanel } from './components/ExportPanel';
import marketData from './data/yusuf-sarai-data.json';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Market Overview', icon: '📊' },
    { id: 'financial', label: 'Financial Impact', icon: '💰' },
    { id: 'map', label: 'Market Map', icon: '🗺️' },
    { id: 'strategy', label: 'Go-to-Market', icon: '🎯' },
    { id: 'network', label: 'Distribution', icon: '🏪' },
    // { id: 'analytics', label: 'Performance', icon: '📈' },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'overview':
        return <MarketOverview data={marketData} />;
      case 'financial':
        return <FinancialImpact data={marketData} />;
      case 'map':
        return <MarketMap data={marketData} />;
      case 'strategy':
        return <GoToMarketStrategy data={marketData} />;
      case 'network':
        return <DistributionNetwork data={marketData} />;
      case 'analytics':
        return <PerformanceAnalytics data={marketData} />;
      default:
        return <MarketOverview data={marketData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {renderActiveComponent()}
          {/* <ExportPanel /> */}
        </div>
      </div>
    </div>
  );
}

export default App;