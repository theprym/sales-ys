export interface DealerLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  performance: 'high' | 'medium' | 'low';
  revenue: number;
  coverage: number;
  type: 'dealer' | 'distributor' | 'retailer';
  address: string;
  contact: string;
}

export interface PerformanceData {
  area: string;
  revenue: number;
  dealers: number;
  coverage: number;
  potential: number;
}

export interface MarketShare {
  brand: string;
  share: number;
  color: string;
}

export interface FilterOptions {
  area: string[];
  performance: string[];
  timeframe: string;
}