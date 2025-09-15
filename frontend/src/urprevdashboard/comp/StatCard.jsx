import React from 'react';

export default function StatCard({ icon, title, value, unit, value2, unit2 }) {
  return (
    <div className="card p-6 flex flex-col items-start gap-2">
      <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]">{icon}</span>
      <p className="text-[var(--text-secondary-color)]">{title}</p>
      <p className="text-3xl font-bold">
        {value}
        {unit && <span className="text-xl">{unit}</span>}
        {value2 && <span>{value2}</span>}
        {unit2 && <span className="text-xl">{unit2}</span>}
      </p>
    </div>
  );
}