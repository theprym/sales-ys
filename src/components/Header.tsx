import React from 'react';
import { Battery, TrendingUp } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Battery className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Amaron</h1>
                <p className="text-sm text-gray-500">Market Expansion Dashboard</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-lg font-semibold text-gray-900">Yusuf Sarai Expansion</span>
              </div>
              <p className="text-sm text-gray-500">Investment Opportunity Analysis</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};