import React, { useState } from 'react';
import { Download, FileText, Image, Share2 } from 'lucide-react';

export const ExportPanel: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<string | null>(null);

  const handleExport = async (type: 'pdf' | 'png' | 'excel') => {
    setIsExporting(true);
    setExportType(type);

    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In a real application, you would implement actual export functionality here
    // For PDF: use jsPDF or similar library
    // For PNG: use html2canvas
    // For Excel: use xlsx library

    const fileName = `amaron-dashboard-${new Date().toISOString().split('T')[0]}.${type}`;
    
    // Create a mock download
    const element = document.createElement('a');
    element.href = '#';
    element.download = fileName;
    element.click();

    setIsExporting(false);
    setExportType(null);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Analytics Dashboard',
        text: 'Investment opportunity analysis for Amaron battery expansion in Yusuf Sarai market',
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Dashboard link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Download className="h-5 w-5 mr-2 text-green-600" />
        Export & Share Dashboard
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          onClick={() => handleExport('pdf')}
          disabled={isExporting}
          className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FileText className="h-5 w-5" />
          <span>{isExporting && exportType === 'pdf' ? 'Exporting...' : 'Export PDF'}</span>
        </button>
        
        <button
          onClick={() => handleExport('png')}
          disabled={isExporting}
          className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Image className="h-5 w-5" />
          <span>{isExporting && exportType === 'png' ? 'Exporting...' : 'Export PNG'}</span>
        </button>
        
        <button
          onClick={() => handleExport('excel')}
          disabled={isExporting}
          className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="h-5 w-5" />
          <span>{isExporting && exportType === 'excel' ? 'Exporting...' : 'Export Excel'}</span>
        </button>
        
        <button
          onClick={handleShare}
          className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
        >
          <Share2 className="h-5 w-5" />
          <span>Share Dashboard</span>
        </button>
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Export Options</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>PDF Report:</strong> Complete investor presentation with all charts and analysis</li>
          <li>• <strong>PNG Images:</strong> High-resolution charts for presentations</li>
          <li>• <strong>Excel Data:</strong> Raw data and calculations for further analysis</li>
          <li>• <strong>Share Link:</strong> Shareable dashboard URL for stakeholders</li>
        </ul>
      </div>
    </div>
  );
};