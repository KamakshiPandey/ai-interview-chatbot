import React from 'react';
import { exportToJSON } from '../utils/exportHelpers';

const ExportPanel = ({ data }) => {
  return (
    <div className="mt-6 text-center">
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        onClick={() => exportToJSON(data)}
      >
        Export Results as JSON
      </button>
    </div>
  );
};

export default ExportPanel;
