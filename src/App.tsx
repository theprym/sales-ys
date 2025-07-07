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
import { dealerLocations, performanceData, marketShare } from './data/mockData';
import {dealerLocationsBengal} from './data/map-data-bengal';
import InteractiveMap from './components/InteractiveMap';
import yusufSaraiData from './data/yusuf-sarai-data.json';
import bengalData from './data/bengal.json';
import { MarketComparison } from './components/MarketComparison';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMarket, setSelectedMarket] = useState('yusuf-sarai');

  const markets = [
    { id: 'yusuf-sarai', label: 'Yusuf Sarai (Delhi)', data: yusufSaraiData },
    { id: 'baruipur', label: 'Baruipur (West Bengal)', data: bengalData },
  ];

  const tabs = [
    { id: 'overview', label: 'Market Overview', icon: '📊' },
    { id: 'financial', label: 'Financial Impact', icon: '💰' },
    { id: 'map', label: 'Market Map', icon: '🗺️' },
    { id: 'strategy', label: 'Go-to-Market', icon: '🎯' },
    { id: 'network', label: 'Distribution', icon: '🏪' },
    { id: 'comparison', label: 'Market Comparison', icon: '⚖️' },
    // { id: 'analytics', label: 'Performance', icon: '📈' },
  ];

   const getCurrentMarketData = () => {
    return markets.find(market => market.id === selectedMarket)?.data || yusufSaraiData;
  };

  const getCurrentMarketLabel = () => {
    return markets.find(market => market.id === selectedMarket)?.label || '';
  };

  const renderActiveComponent = () => {
    const currentData = getCurrentMarketData();
    switch (activeTab) {
      case 'overview':
        return <MarketOverview data={currentData} />;
      case 'financial':
        return <FinancialImpact data={currentData} marketName={getCurrentMarketLabel()} />;
      case 'map':
        return <InteractiveMap dealers={getMapData()} className='h-screen' locationName={selectedMarket}/>;
      case 'strategy':
        return <GoToMarketStrategy data={currentData} />;
      case 'network':
        return <DistributionNetwork data={currentData} />;
      case 'analytics':
        return <PerformanceAnalytics data={currentData} />;
      case 'comparison':
        return <MarketComparison yusufSaraiData={yusufSaraiData} bengalData={bengalData} />;
      default:
        return <MarketOverview data={currentData} />;
    }
  };

  const getMapData = () => {
    if (selectedMarket == 'yusuf-sarai'){
      return dealerLocations;
    }else{
      return dealerLocationsBengal;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
      selectedMarket={selectedMarket} 
        marketLabel={activeTab !== 'comparison' ? getCurrentMarketLabel() : undefined}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Market Selector */}
        {activeTab !== 'comparison' && (
          <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Select Market</h2>
              <div className="flex space-x-2">
                {markets.map((market) => (
                  <button
                    key={market.id}
                    onClick={() => setSelectedMarket(market.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedMarket === market.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {market.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

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