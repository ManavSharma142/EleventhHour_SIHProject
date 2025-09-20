import React from 'react';
import clsx from 'clsx';

export function Badge({ children, className = '', variant = 'default' }) {
  const baseStyles =
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium';

  const variants = {
    default: 'bg-blue-600 text-white',
    outline: 'border border-white/30 text-white',
    subtle: 'bg-white/10 text-white',
  };

  return (
    <span className={clsx(baseStyles, variants[variant], className)}>
      {children}
    </span>
  );
}
