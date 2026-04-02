'use client';

import React, { useRef, useEffect } from 'react';
import { useTabStore } from '@/context/tabStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Pin, Plus, Sparkles, Navigation, MessageSquare, User, Map as MapIcon, Compass } from 'lucide-react';
import { cn } from '@/utils/cn'; // Assuming I'll need a cn util

export default function TabBar() {
  const { tabs, activeTabId, setActiveTab, removeTab, pinTab, unpinTab } = useTabStore();
  const scrollRef = useRef(null);

  useEffect(() => {
    // Scroll active tab into view
    const activeEl = document.getElementById(`tab-${activeTabId}`);
    if (activeEl && scrollRef.current) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTabId]);

  const getIcon = (type) => {
    switch (type) {
      case 'discover': return <Sparkles size={14} />;
      case 'trip': return <Navigation size={14} />;
      case 'chat': return <MessageSquare size={14} />;
      case 'profile': return <User size={14} />;
      default: return <Compass size={14} />;
    }
  };

  return (
    <div className="flex items-center w-full px-4 border-b border-white/10 bg-black/40 backdrop-blur-md overflow-hidden h-14">
      {/* Scrollable Tabs Area */}
      <div 
        ref={scrollRef}
        className="flex items-center flex-1 h-full overflow-x-auto gap-1 scrollbar-hide scroll-smooth no-scrollbar"
      >
        <AnimatePresence>
          {tabs.map((tab, idx) => {
            const isActive = tab.id === activeTabId;
            return (
              <motion.div
                id={`tab-${tab.id || idx}`}
                key={tab.id || `tab-${idx}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex items-center h-11 px-6 min-w-[140px] max-w-[200px] border-r border-white/5 transition-all duration-300 group overflow-hidden shrink-0 cursor-pointer",
                  isActive ? "bg-white/10 text-white" : "bg-transparent text-white/50 hover:bg-white/5 hover:text-white/80"
                )}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold shadow-[0_0_10px_rgba(251,191,36,0.5)]" 
                  />
                )}

                <div className="flex items-center gap-2.5 truncate z-10">
                  <span className={cn("transition-colors", isActive ? "text-accent-gold" : "text-white/40 group-hover:text-white/60")}>
                    {getIcon(tab.type)}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-widest truncate max-w-[100px]">
                    {tab.title}
                  </span>
                </div>

                {/* Close Button & Pin Status */}
                <div className="flex items-center ml-auto gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  {!tab.pinned && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeTab(tab.id); }}
                      className="p-1 rounded-full hover:bg-white/10 text-white/40 hover:text-white"
                    >
                      <X size={12} />
                    </button>
                  )}
                  {tab.pinned && (
                    <Pin size={10} className="text-accent-gold rotate-45" />
                  )}
                </div>

                {/* Micro-glow effect on active */}
                {isActive && (
                  <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-accent-gold/5 pointer-events-none" />
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Quick New Tab Placeholder */}
        <button className="flex items-center justify-center p-3 h-11 border-r border-white/5 text-white/40 hover:text-white hover:bg-white/5 transition-all shrink-0">
           <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
