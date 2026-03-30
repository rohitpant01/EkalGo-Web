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
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E4B250" />
            <stop offset="100%" stopColor="#FF6B35" />
          </linearGradient>
        </defs>
        {/* Hexagon base */}
        <path
          d="M32 6 L56 19 L56 45 L32 58 L8 45 L8 19 Z"
          fill="rgba(4,51,88,0.9)"
          stroke="url(#logoGrad)"
          strokeWidth="2"
        />
        {/* Compass rose */}
        <circle cx="32" cy="32" r="9" fill="url(#logoGrad)" />
        {/* Cardinal points */}
        <path d="M32 14 L32 22" stroke="url(#logoGrad)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M32 42 L32 50" stroke="url(#logoGrad)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 32 L22 32" stroke="url(#logoGrad)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M42 32 L50 32" stroke="url(#logoGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Center dot */}
        <circle cx="32" cy="32" r="3" fill="#021A2C" />
      </svg>

      {showText && (
        <span className={`font-display font-bold ${s.text} tracking-tight`}>
          <span className="text-gradient-amber">Ekal</span>
          <span className="text-white">Go</span>
        </span>
      )}
    </div>
  );
}
