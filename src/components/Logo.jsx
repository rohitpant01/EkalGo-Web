'use client';

import React from 'react';

export default function Logo({ size = 'md', showText = true }) {
  const sizes = {
    sm: { icon: 28, text: 'text-lg' },
    md: { icon: 36, text: 'text-2xl' },
    lg: { icon: 48, text: 'text-3xl' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className="flex items-center gap-2.5">
      {/* Icon mark */}
      <img 
        src="/logo.png" 
        alt="EkalGo Logo" 
        width={s.icon} 
        height={s.icon} 
        className="flex-shrink-0 object-contain drop-shadow-[0_0_10px_rgba(45,212,191,0.3)] hover:scale-105 transition-transform duration-300"
      />

      {showText && (
        <span className={`font-display font-bold ${s.text} tracking-tight`}>
          <span className="text-white">Eka</span>
          <span className="text-gradient-amber">lGo</span>
        </span>
      )}
    </div>
  );
}
