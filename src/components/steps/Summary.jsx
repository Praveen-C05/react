import React from 'react';

function Summary({ formData }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Summary</h3>
      <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
  );
}

export default Summary;