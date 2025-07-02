import React from 'react';

function Step1({ formData, updateField }) {
  return (
    <div className="space-y-4">
      <input type="text" value={formData.name} onChange={e => 
        updateField('name', e.target.value)} 
        placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600" />
      <input type="email" value={formData.email} onChange={e => 
        updateField('email', e.target.value)}
         placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600" />
      <input type="number" value={formData.age} onChange={e => 
        updateField('age', e.target.value)} 
        placeholder="Age" className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600" />
    </div>
  );
}

export default Step1;