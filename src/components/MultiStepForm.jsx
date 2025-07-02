import React, { useState } from 'react';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Summary from './steps/Summary';

const steps = [Step1, Step2, Step3, Summary];

function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    profession: '',
    location: '',
    about: ''
  });

  const next = () => setStep(prev => Math.min(prev + 1, steps.length - 1));
  const prev = () => setStep(prev => Math.max(prev - 1, 0));
  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const StepComponent = steps[step];

  return (
    <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">Step {step + 1} of {steps.length}</h2>
      </div>
      <StepComponent formData={formData} updateField={updateField} />
      <div className="flex justify-between mt-6">
        {step > 0 && <button onClick={prev} className="px-4 py-2 bg-gray-500 text-white rounded-lg">Back</button>}
        {step < steps.length - 1 ? (
          <button onClick={next} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Next</button>
        ) : null}
      </div>
    </div>
  );
}

export default MultiStepForm;
