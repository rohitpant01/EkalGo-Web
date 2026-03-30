import React from 'react';

export function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(4,51,88,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
      {/* Image skeleton */}
      <div className="h-48 shimmer" style={{ background: 'rgba(6,76,132,0.4)' }} />
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 rounded-lg shimmer" style={{ background: 'rgba(6,76,132,0.4)' }} />
        <div className="h-4 w-1/2 rounded-lg shimmer" style={{ background: 'rgba(6,76,132,0.3)' }} />
        <div className="h-3 w-full rounded-lg shimmer" style={{ background: 'rgba(6,76,132,0.2)' }} />
        <div className="h-3 w-5/6 rounded-lg shimmer" style={{ background: 'rgba(6,76,132,0.2)' }} />
      </div>
    </div>
  );
}

export function SkeletonItinerary() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title skeleton */}
      <div className="text-center mb-10 space-y-4">
        <div className="h-10 w-96 rounded-xl shimmer mx-auto" style={{ background: 'rgba(6,76,132,0.4)' }} />
        <div className="h-5 w-64 rounded-lg shimmer mx-auto" style={{ background: 'rgba(6,76,132,0.3)' }} />
      </div>

      {/* Days */}
      {[1, 2, 3].map((day) => (
        <div key={day} className="mb-10">
          <div className="h-7 w-32 rounded-lg shimmer mb-6" style={{ background: 'rgba(6,76,132,0.4)' }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
