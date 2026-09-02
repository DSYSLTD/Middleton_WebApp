import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export interface StepItem {
  num: number;
  label: string;
  subtitle?: string;
}

interface FormProgressBarProps {
  steps: StepItem[];
  currentStep: number;
  className?: string;
}

export default function FormProgressBar({ steps, currentStep, className = '' }: FormProgressBarProps) {
  const totalSteps = steps.length;
  const progressPercent = Math.min(100, Math.max(0, ((currentStep - 1) / (totalSteps - 1 || 1)) * 100));

  return (
    <div className={`w-full bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200 mb-8 ${className}`}>
      {/* Top Header Label */}
      <div className="flex justify-between items-center mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
        <span>Step {currentStep} of {totalSteps}</span>
        <span className="text-[#411548]">
          {steps.find(s => s.num === currentStep)?.label || ''}
        </span>
      </div>

      {/* Background Track and Fill */}
      <div className="relative w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-6">
        <div 
          className="h-full bg-gradient-to-r from-[#411548] to-purple-600 transition-all duration-500 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step Badges and Labels */}
      <div className="flex justify-between items-start relative">
        {steps.map((step) => {
          const isCompleted = step.num < currentStep;
          const isCurrent = step.num === currentStep;

          return (
            <div key={step.num} className="flex flex-col items-center text-center z-10 flex-1">
              <div 
                className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black text-xs transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-emerald-600 text-white shadow-md scale-105' 
                    : isCurrent 
                    ? 'bg-[#411548] text-white ring-4 ring-purple-100 shadow-lg scale-110' 
                    : 'bg-gray-100 text-gray-400 border border-gray-200'
                }`}
              >
                {isCompleted ? <CheckCircle2 size={18} /> : step.num}
              </div>

              <span 
                className={`text-[11px] md:text-xs font-bold uppercase tracking-wider mt-2 line-clamp-1 transition-colors ${
                  isCurrent 
                    ? 'text-[#411548] font-black' 
                    : isCompleted 
                    ? 'text-gray-700 font-semibold' 
                    : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>

              {step.subtitle && (
                <span className="text-[10px] text-gray-400 hidden sm:block font-light">
                  {step.subtitle}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
