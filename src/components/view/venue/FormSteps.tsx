'use client';
import { tinos } from '@/app/layout';
import Button from '@/components/common/Button';
import { MapPin } from 'lucide-react';
import React from 'react';
import Contact from '../Contact';

function FormSteps({
  currentStep,
  numbers,
  setCurrentStep,
  setEventType,
  setNumbers,
}: {
  currentStep: number;
  numbers: string;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setEventType: React.Dispatch<React.SetStateAction<string>>;
  setNumbers: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setNumbers(value);
    setCurrentStep(3);
  };

  return (
    <div className="flex items-center flex-col mb-80">
      <span
        className={`${tinos.className} text-white text-lg flex items-center`}
      >
        <MapPin className="text-primary mr-10" /> Sydney
      </span>
      <div
        className={`${tinos.className} text-2xl mt-50 text-white text-center`}
      >
        {stepsInfo[currentStep - 1].title}
      </div>
      {currentStep === 1 && (
        <div className="flex gap-20 mt-20" id="step1">
          <Button
            id="Standing"
            className="w-160"
            onClick={(e) => {
              setEventType(e.target.id);
              setCurrentStep(2);
            }}
          >
            <span>Standing</span>
          </Button>
          <Button
            id="Seated Dining"
            className="w-160"
            onClick={(e) => {
              setEventType(e.target.id);
              setCurrentStep(2);
            }}
          >
            <span>Seated Dining</span>
          </Button>
        </div>
      )}
      {currentStep === 2 && (
        <div className="flex flex-col items-start bg-darkBg mt-20" id="step 2">
          <select
            id="guest-number"
            value={numbers}
            onChange={handleChange}
            className="w-full bg-darkBg border border-secondary text-primary text-sm focus:ring-secondary focus:border-secondary p-2.5"
          >
            <option value="" disabled>
              Select number of guests
            </option>
            {options.map((option, index) => (
              <option key={index} value={option} className="bg-darkBg">
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {currentStep === 3 && (
        <div className="flex flex-col items-start bg-darkBg mt-20" id="step 2">
          <select
            id="guest-number"
            value={numbers}
            onChange={handleChange}
            className="w-full bg-darkBg border border-secondary text-primary text-sm focus:ring-secondary focus:border-secondary p-2.5"
          >
            <option value="" disabled>
              Select number of guests
            </option>
            {options.map((option, index) => (
              <option key={index} value={option} className="bg-darkBg">
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {currentStep === 4 && (
        <div
          className="flex flex-col items-start bg-darkBg px-20 mt-20 w-max"
          id="step 2"
        >
          <Contact isFromSteps />
        </div>
      )}
    </div>
  );
}

export default FormSteps;

const options = ['5 to 10', '11 to 20', '20 to 50', '50 to 80'];

const stepsInfo = [
  {
    title: 'What type of event are you planning?',
  },
  {
    title: 'How many guests will attend your event?',
  },
  {
    title: 'What is your budget for the event?',
  },
  {
    title: 'Please provide your contact information.',
  },
];
