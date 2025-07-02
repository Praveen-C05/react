import React from 'react';

function Step3({ formData, updateField }) {
  return (
    <div className="space-y-4">
      <textarea value={formData.about} onChange={e =>
       updateField('about', e.target.value)}
       placeholder="Tell us about yourself..." className="w-full p-3 border border-gray-300 rounded-lg h-32 dark:bg-gray-700 dark:border-gray-600"></textarea>
    </div>
  );
}

export default Step3;