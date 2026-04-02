'use client';

import React from 'react';

export default function SplitShell({ children, visualContent }) {
  return (
    <div className="min-h-screen bg-brand-900 overflow-hidden flex flex-col md:flex-row">
      
      {/* 1. Left Content Panel (Interaction) */}
      <aside className="w-full md:w-[45%] lg:w-[40%] xl:w-[35%] h-full md:h-screen md:overflow-y-auto custom-scrollbar relative z-20 border-r border-white/5 bg-brand-900/50 backdrop-blur-xl">
        <div className="p-4 md:p-6 lg:p-8 space-y-6 pb-12">
          {children}
        </div>
      </aside>

      {/* 2. Right Visual Panel (Immersive context) */}
      <main className="hidden md:block flex-1 h-screen sticky top-0 bg-brand-800 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-neon/5 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Content Placeholder (Maps/Hero Video) */}
        <div className="w-full h-full relative z-10 flex items-center justify-center">
           {visualContent || (
             <div className="w-full h-full bg-brand-900/40 animate-pulse flex flex-col items-center justify-center space-y-4">
                <div className="w-24 h-24 rounded-full border-2 border-white/5 border-t-accent-gold animate-spin-slow" />
                <p className="text-blue-100/20 font-display font-medium uppercase tracking-widest text-xs">Initializing Interactive Map...</p>
             </div>
           )}
        </div>

        {/* Desktop Branding Overlay */}
        <div className="absolute top-10 right-10 z-20">
           <div className="px-4 py-2 rounded-xl bg-brand-900/80 border border-white/10 backdrop-blur-md shadow-2xl">
              <span className="text-xs font-bold font-display tracking-widest text-accent-gold uppercase">EkalGo Premium Product v1.0</span>
           </div>
        </div>
      </main>

      {/* 3. Mobile Bottom Navigation (Native App Feel) */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-brand-900/90 backdrop-blur-2xl border-t border-white/5 z-[100] md:hidden flex items-center justify-around px-6">
         {['Search', 'Saved', 'Profile'].map((item, i) => (
            <button key={i} className="flex flex-col items-center gap-1 group">
               <div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-accent-gold/10 transition-colors">
                  <div className={`w-5 h-5 border-2 ${i === 0 ? 'border-accent-gold' : 'border-white/20'} rounded-md`} />
               </div>
               <span className={`text-[10px] font-bold uppercase tracking-widest ${i === 0 ? 'text-accent-gold' : 'text-blue-100/40'}`}>
                  {item}
               </span>
            </button>
         ))}
      </nav>
    </div>
  );
}
