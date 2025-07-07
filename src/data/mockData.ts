import { DealerLocation, PerformanceData, MarketShare } from '../types';

export const dealerLocations: DealerLocation[] = [
  {
    id: '1',
    name: 'Yusuf Sarai Auto Parts',
    lat: 28.5355,
    lng: 77.2090,
    performance: 'high',
    revenue: 450000,
    coverage: 85,
    type: 'dealer',
    address: 'Main Market, Yusuf Sarai',
    contact: '+91 9999209910'
  },
  {
    id: '2',
    name: 'Green Park Battery Center',
    lat: 28.5505,
    lng: 77.2070,
    performance: 'medium',
    revenue: 280000,
    coverage: 65,
    type: 'retailer',
    address: 'Green Park Market',
    contact: '+91 9876543211'
  },
  {
    id: '3',
    name: 'Safdarjung Auto Hub',
    lat: 28.5685,
    lng: 77.2065,
    performance: 'high',
    revenue: 520000,
    coverage: 90,
    type: 'distributor',
    address: 'Safdarjung Enclave',
    contact: '+91 9876543212'
  },
  {
    id: '4',
    name: 'Hauz Khas Battery Shop',
    lat: 28.5535,
    lng: 77.2000,
    performance: 'low',
    revenue: 150000,
    coverage: 40,
    type: 'retailer',
    address: 'Hauz Khas Village',
    contact: '+91 9876543213'
  },
  {
    id: '5',
    name: 'South Extension Parts',
    lat: 28.5745,
    lng: 77.2245,
    performance: 'medium',
    revenue: 320000,
    coverage: 70,
    type: 'dealer',
    address: 'South Extension Market',
    contact: '+91 9876543214'
  },
  {
    id: '6',
    name: 'Lajpat Nagar Auto Zone',
    lat: 28.5655,
    lng: 77.2430,
    performance: 'high',
    revenue: 480000,
    coverage: 88,
    type: 'distributor',
    address: 'Lajpat Nagar Central Market',
    contact: '+91 9876543215'
  }
];

export const performanceData: PerformanceData[] = [
  { area: 'Yusuf Sarai', revenue: 450000, dealers: 3, coverage: 85, potential: 550000 },
  { area: 'Green Park', revenue: 280000, dealers: 2, coverage: 65, potential: 420000 },
  { area: 'Safdarjung', revenue: 520000, dealers: 4, coverage: 90, potential: 580000 },
  { area: 'Hauz Khas', revenue: 150000, dealers: 1, coverage: 40, potential: 380000 },
  { area: 'South Extension', revenue: 320000, dealers: 2, coverage: 70, potential: 450000 },
  { area: 'Lajpat Nagar', revenue: 480000, dealers: 3, coverage: 88, potential: 520000 }
];

export const marketShare: MarketShare[] = [
  { brand: 'Amaron', share: 35, color: '#1e40af' },
  { brand: 'Exide', share: 28, color: '#dc2626' },
  { brand: 'Luminous', share: 22, color: '#16a34a' },
  { brand: 'Okaya', share: 15, color: '#ea580c' }
];

export const recommendedLocations = [
  { lat: 28.5425, lng: 77.2150, type: 'high-priority', reason: 'High footfall area with no coverage' },
  { lat: 28.5615, lng: 77.2180, type: 'medium-priority', reason: 'Growing residential area' },
  { lat: 28.5385, lng: 77.2010, type: 'low-priority', reason: 'Potential expansion zone' }
];