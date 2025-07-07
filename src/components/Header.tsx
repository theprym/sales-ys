import React from 'react';
import { Battery, TrendingUp } from 'lucide-react';

interface HeaderProps {
  selectedMarket?: string;
  marketLabel?: string;
}

export const Header: React.FC<HeaderProps> = ({ selectedMarket, marketLabel }) => {
  const getMarketTitle = () => {
    if (!selectedMarket || !marketLabel) {
      return 'Market Expansion Dashboard';
    }
    
    if (selectedMarket === 'yusuf-sarai') {
      return 'Yusuf Sarai Expansion';
    } else if (selectedMarket === 'baruipur') {
      return 'Baruipur Expansion';
    }
    
    return 'Market Expansion Dashboard';
  };

  const getMarketSubtitle = () => {
    if (!selectedMarket || !marketLabel) {
      return 'Investment Opportunity Analysis';
    }
    
    if (selectedMarket === 'yusuf-sarai') {
      return 'Delhi Market Investment Analysis';
    } else if (selectedMarket === 'baruipur') {
      return 'West Bengal Market Investment Analysis';
    }
    
    return 'Investment Opportunity Analysis';
  };

  const getMarketLeftTitle = () => {
    if (!selectedMarket || !marketLabel) {
      return '110016 - Yusuf Sarai Analytics';
    }
    
    if (selectedMarket === 'yusuf-sarai') {
      return '110016 - Yusuf Sarai Analytics';
    } else if (selectedMarket === 'baruipur') {
      return '700144 - Baruipur Analytics';
    }
    
    return 'Investment Opportunity Analysis';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Battery className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{getMarketLeftTitle()}</h1>
                <p className="text-sm text-gray-500">Market Expansion Dashboard</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-lg font-semibold text-gray-900">{getMarketTitle()}</span>
              </div>
              <p className="text-sm text-gray-500">{getMarketSubtitle()}</p>
              {marketLabel && (
                <p className="text-xs text-blue-600 mt-1">{marketLabel}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};