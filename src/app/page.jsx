'use client';

import React, { useEffect } from 'react';
import TabSystem from '@/components/layout/TabSystem';
import Navbar from '@/components/Navbar';
import { useTabStore } from '@/context/tabStore';

export default function Home() {
  const { addTab, setActiveTab } = useTabStore();

  // Initial setup: If no tabs, add the discover tab
  useEffect(() => {
    // This is handled by the initial state in tabStore, 
    // but we can ensure a consistent experience here.
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-brand-900 overflow-hidden">
      {/* Top Navbar - Integrated into SPA */}
      <Navbar />
      
      {/* Main SPA Workspace */}
      <div className="flex-1 mt-20">
        <TabSystem />
      </div>
    </div>
  );
}
