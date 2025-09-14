import React from 'react';

export default function ProgressRing() {
  const percentage = 80;
  const circumference = 15.9155 * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="card p-6 flex flex-col items-center flex-grow">
      <h3 className="text-xl font-bold mb-4">Progress Ring</h3>
      <div className="relative w-40 h-40">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path 
            className="text-white/10" 
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
          ></path>
          <path 
            className="text-[var(--primary-color)]" 
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
            fill="none" 
            stroke="currentColor" 
            strokeDasharray={`${percentage}, 100`}
            strokeDashoffset="-5" 
            strokeLinecap="round" 
            strokeWidth="3"
            style={{ transition: 'stroke-dasharray 0.5s ease-in-out' }}
          ></path>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">{percentage}%</span>
          <span className="text-[var(--text-secondary-color)]">400/500 kcal</span>
        </div>
      </div>
    </div>
  );
}