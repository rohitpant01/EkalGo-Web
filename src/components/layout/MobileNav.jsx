'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTabStore } from '@/context/tabStore';
import { Compass, Calendar, MessageSquare, User, MapPin } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function MobileNav() {
  const { activeTabId, setActiveTab, addTab, tabs } = useTabStore();

  const navItems = [
    { id: 'discover', label: 'Discover', icon: <Compass size={20} />, type: 'discover' },
    { id: 'trips', label: 'Trips', icon: <Calendar size={20} />, type: 'trip' },
    { id: 'chats', label: 'Chats', icon: <MessageSquare size={20} />, type: 'chat' },
  ];

  const handleNavClick = (item) => {
    // If tab doesn't exist, add it
    const existing = tabs.find(t => t.id === item.id || t.type === item.type);
    if (existing) {
      setActiveTab(existing.id);
    } else {
      addTab({ id: item.id, title: item.label, type: item.id, data: {} });
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-brand-900/90 backdrop-blur-2xl border-t border-white/5 z-[100] md:hidden flex items-center justify-around px-6">
      {navItems.map((item) => {
        const isActive = activeTabId === item.id || tabs.find(t => t.id === activeTabId)?.type === item.type;
        return (
          <button 
            key={item.id} 
            onClick={() => handleNavClick(item)}
            className="flex flex-col items-center gap-1 group relative py-2"
          >
            <div className={cn(
              "p-2 rounded-xl transition-all duration-300",
              isActive ? "text-accent-gold" : "text-white/30 hover:text-white/50"
            )}>
              {item.icon}
            </div>
            <span className={cn(
              "text-[9px] font-bold uppercase tracking-widest transition-colors",
              isActive ? "text-accent-gold" : "text-blue-100/30"
            )}>
              {item.label}
            </span>

            {isActive && (
              <motion.div 
                layoutId="mobileNavIndicator"
                className="absolute top-0 w-8 h-1 bg-accent-gold rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
