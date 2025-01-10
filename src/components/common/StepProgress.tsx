import React from 'react';

interface StepProgressProps {
  steps: string[]; // 각 스텝의 이름
  currentStep: number; // 현재 활성화된 스텝 (1-based index)
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  currentStep,
  setCurrentStep,
}) => {
  return (
    <div className="flex items-center justify-between w-full max-w-xl mx-auto my-60 px-16 md:px-0">
      {steps.map((step, index) => {
        const isActive = index + 1 <= currentStep;
        const isCompleted = index + 1 < currentStep;

        return (
          <>
            <div className="flex items-center flex-col">
              <div key={index} className="flex items-center">
                <div
                  className={`w-30 h-30 flex items-center justify-center rounded-full border-2 ${
                    isActive
                      ? isCompleted
                        ? 'bg-secondary border-primary'
                        : 'bg-darkBg text-primary border-secondary'
                      : 'bg-nuetral-500 border-neutral-500 text-neutral-400'
                  }`}
                >
                  {isCompleted ? '✓' : index + 1}
                </div>

                <div
                  onClick={() => {
                    setCurrentStep(index + 1);
                  }}
                  className={`ml-6 hidden md:block text-sm cursor-pointer hover:underline transition-all ${
                    isActive ? 'text-primary' : 'text-neutral-400'
                  }`}
                >
                  {step}
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`w-50 hidden md:block md:w-80 h-1 mx-10 md:mx-20 ${
                      isCompleted ? 'bg-secondary' : 'bg-neutral-500'
                    }`}
                  />
                )}
              </div>
              <div
                onClick={() => {
                  setCurrentStep(index + 1);
                }}
                className={`block md:hidden text-xs mt-10 cursor-pointer hover:underline transition-all ${
                  isActive ? 'text-primary' : 'text-neutral-400'
                }`}
              >
                {step}
              </div>
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`w-20 block md:hidden h-1 mx-10 ${
                  isCompleted ? 'bg-secondary' : 'bg-neutral-500'
                }`}
              ></div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default StepProgress;
