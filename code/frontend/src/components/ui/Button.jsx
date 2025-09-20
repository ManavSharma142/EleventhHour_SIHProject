import React from 'react';
import clsx from 'clsx';

export function Button({
  children,
  className = '',
  size = 'md',
  variant = 'solid',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variants = {
    solid: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    outline:
      'border border-white/30 text-white hover:bg-white/10 focus:ring-white/40 backdrop-blur-sm',
    ghost:
      'text-white hover:bg-white/10 focus:ring-white/40 backdrop-blur-sm',
  };

  return (
    <button
      className={clsx(baseStyles, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
