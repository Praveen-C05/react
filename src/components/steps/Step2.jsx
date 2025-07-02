import React from 'react';

function Step2({ formData, updateField }) {
  return (
    <div className="space-y-4">
      <input type="text" value={formData.profession} onChange={e => 
        updateField('profession', e.target.value)} 
        placeholder="Profession" className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600" />
      <input type="text" value={formData.location} onChange={e =>
         updateField('location', e.target.value)} 
         placeholder="Location" className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600" />


    </div>
  );
}

export default Step2;