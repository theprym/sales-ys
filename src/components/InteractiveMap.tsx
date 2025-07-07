import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { DealerLocation } from '../types';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface InteractiveMapProps {
  dealers: DealerLocation[];
  className?: string;
  locationName: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ dealers, className = '', locationName }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    mapInstance.current = L.map(mapRef.current).setView([28.5505, 77.2070], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance.current);

    // Initialize markers layer
    markersRef.current = L.layerGroup().addTo(mapInstance.current);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current || !markersRef.current) return;

    // Clear existing markers
    markersRef.current.clearLayers();

    // Add dealer markers
    dealers.forEach((dealer) => {
      const color = dealer.performance === 'high' ? '#16a34a' : 
                   dealer.performance === 'medium' ? '#ea580c' : '#dc2626';
      
      const icon = L.divIcon({
        html: `
          <div style="
            background-color: ${color};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>
        `,
        iconSize: [20, 20],
        className: 'custom-marker'
      });

      const marker = L.marker([dealer.lat, dealer.lng], { icon })
        .bindPopup(`
          <div class="p-3">
            <h3 class="font-semibold text-gray-900">${dealer.name}</h3>
            <p class="text-sm text-gray-600 mt-1">${dealer.address}</p>
            <div class="mt-2 space-y-1">
              <div class="flex justify-between">
                <span class="text-xs text-gray-500">Revenue:</span>
                <span class="text-xs font-medium">₹${dealer.revenue.toLocaleString()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-xs text-gray-500">Coverage:</span>
                <span class="text-xs font-medium">${dealer.coverage}%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-xs text-gray-500">Type:</span>
                <span class="text-xs font-medium capitalize">${dealer.type}</span>
              </div>
            </div>
          </div>
        `);

      // Add coverage circle
      const circle = L.circle([dealer.lat, dealer.lng], {
        color: color,
        fillColor: color,
        fillOpacity: 0.1,
        radius: dealer.performance === 'high' ? 2000 : 
               dealer.performance === 'medium' ? 1500 : 1000
      });

      markersRef.current?.addLayer(marker);
      markersRef.current?.addLayer(circle);
    });

    // Add recommended locations
    // const recommendedLocations = [
    //   { lat: 28.5425, lng: 77.2150, type: 'high-priority', reason: 'High footfall area with no coverage' },
    //   { lat: 28.5615, lng: 77.2180, type: 'medium-priority', reason: 'Growing residential area' },
    //   { lat: 28.5385, lng: 77.2010, type: 'low-priority', reason: 'Potential expansion zone' }
    // ];

    // recommendedLocations.forEach((location) => {
    //   const color = location.type === 'high-priority' ? '#fbbf24' : 
    //                location.type === 'medium-priority' ? '#f59e0b' : '#d97706';
      
    //   const icon = L.divIcon({
    //     html: `
    //       <div style="
    //         background-color: ${color};
    //         width: 16px;
    //         height: 16px;
    //         border-radius: 50%;
    //         border: 2px solid white;
    //         box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    //         animation: pulse 2s infinite;
    //       "></div>
    //     `,
    //     iconSize: [16, 16],
    //     className: 'recommended-marker'
    //   });

    //   const marker = L.marker([location.lat, location.lng], { icon })
    //     .bindPopup(`
    //       <div class="p-3">
    //         <h3 class="font-semibold text-yellow-600">Recommended Location</h3>
    //         <p class="text-sm text-gray-600 mt-1">${location.reason}</p>
    //         <div class="mt-2">
    //           <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
    //             ${location.type.replace('-', ' ')}
    //           </span>
    //         </div>
    //       </div>
    //     `);

    //   markersRef.current?.addLayer(marker);
    // });

  }
  , [dealers]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-lg" style={{
        height: '100%',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 0
      }} />
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg" style={{
        zIndex: 1,
        position: 'relative',
        width: '200px',
      }}>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">High Performance</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Medium Performance</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Low Performance</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">Recommended</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;