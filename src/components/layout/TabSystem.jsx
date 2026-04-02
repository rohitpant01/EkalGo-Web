'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useTabStore } from '@/context/tabStore';
import TabBar from './TabBar';
import { AnimatePresence, motion } from 'framer-motion';
import { Compass, Map as MapIcon, MessageSquare, User, X, Plus, Pin, PinOff } from 'lucide-react';

import DiscoverView from '../views/DiscoverView';
import ItineraryView from '../views/ItineraryView';
import GroupChatView from '../views/GroupChatView';
import SharedItemsView from '../views/SharedItemsView';
import ExploreView from '../views/ExploreView';

import dynamic from 'next/dynamic';
import Footer from '../Footer';

const InteractiveMap = dynamic(() => import('../Map/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-brand-900 flex-col gap-4">
      <div className="w-12 h-12 border-4 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin" />
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Streaming Surface Data...</p>
    </div>
  )
});

import { cn } from '@/utils/cn';

export default function TabSystem() {
  const { tabs, activeTabId, setActiveTab, removeTab, addTab } = useTabStore();
  const [isMounted, setIsMounted] = useState(false);
  const [showMapMobile, setShowMapMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeTab = useMemo(() => tabs.find(t => t.id === activeTabId) || tabs[0], [tabs, activeTabId]);

  if (!isMounted) return null;

  const renderTabContent = (tab) => {
    switch (tab.type) {
      case 'discover': return <DiscoverView />;
      case 'trip': return <ItineraryView data={tab.data} />;
      case 'chat': return <GroupChatView data={tab.data} />;
      case 'shared': return <SharedItemsView data={tab.data} />;
      case 'explore': return <ExploreView data={tab.data} />;
      default: return <DiscoverView />;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] w-full overflow-hidden relative">
      {/* internal Tab Bar */}
      <TabBar />

      <div className="flex-1 flex min-h-0 bg-[#020C16]">
        {/* Left Aspect: Content (70% on large screens) */}
        <div className={cn(
          "flex-1 lg:max-w-4xl xl:max-w-5xl border-r border-white/5 bg-black/40 relative z-10 overflow-y-auto custom-scrollbar scroll-smooth",
          showMapMobile ? "hidden lg:block" : "block"
        )}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTabId}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.15 }}
              className="min-h-full pb-24"
            >
              {renderTabContent(activeTab)}
            </motion.div>
          </AnimatePresence>
          <Footer />
        </div>

        {/* Right Aspect: Interactive Map (Persistent on desktop, Toggle on mobile) */}
        <div className={cn(
          "bg-black relative transition-all duration-500",
          showMapMobile 
            ? "fixed inset-0 z-50 pt-16 pb-20 block" // Fullscreen mobile
            : "hidden lg:block lg:flex-1 z-0" // Sidebar desktop
        )}>
           <InteractiveMap />
        </div>
      </div>

      {/* Mobile Map Toggle FAB */}
      <div className="lg:hidden fixed bottom-28 left-1/2 -translate-x-1/2 z-[100]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMapMobile(!showMapMobile)}
          className="flex items-center gap-2 px-8 py-4 rounded-full bg-brand-accent text-[#0B0F1A] font-black uppercase tracking-widest text-[10px] shadow-[0_10px_30px_rgba(245,185,66,0.4)] transition-all duration-300"
        >
          {showMapMobile ? (
            <>
              <Compass className="w-5 h-5 animate-pulse" />
              <span>Back to List</span>
            </>
          ) : (
            <>
              <MapIcon className="w-5 h-5" />
              <span>Show Map</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
