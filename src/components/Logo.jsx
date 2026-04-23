'use client';

import React from 'react';

export default function Logo({ size = 'md', showText = true, variant = 'default' }) {
  const sizes = {
    sm: { icon: 28, text: 'text-lg' },
    md: { icon: 36, text: 'text-xl' },
    lg: { icon: 48, text: 'text-2xl' },
  };
  const s = sizes[size] || sizes.md;

  const textColor = variant === 'light' ? 'text-white' : 'text-dark';
  const accentColor = variant === 'light' ? 'text-primary-300' : 'text-accent-400';

  return (
    <div className="flex items-center gap-2.5">
      <img 
        src="/logo.png" 
        alt="EkalGo Logo" 
        width={s.icon} 
        height={s.icon} 
        className="flex-shrink-0 object-contain"
      />
      {showText && (
        <span className={`font-display font-bold ${s.text} tracking-tight`}>
          <span className={textColor}>Ekal</span>
          <span className={accentColor}>Go</span>
        </span>
      )}
    </div>
  );
}
