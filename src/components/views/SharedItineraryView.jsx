'use client';

import React, { useEffect } from 'react';
import { useTabStore } from '@/context/tabStore';
import TabSystem from '@/components/layout/TabSystem';
import Navbar from '@/components/Navbar';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SharedItineraryView({ itineraryData, cityId, error }) {
  const router = useRouter();
  const { addTab, setActiveTab, tabs } = useTabStore();

  useEffect(() => {
    if (itineraryData && cityId) {
      // Check if this itinerary is already in tabs to prevent duplicates
      const tabId = `shared-${cityId}`;
      const existingTab = tabs.find(t => t.id === tabId);
      
      if (!existingTab) {
        addTab({
          id: tabId,
          title: itineraryData.title || 'Shared Trip',
          type: 'trip',
          data: { ...itineraryData, id: cityId }
        });
      }
      
      setActiveTab(tabId);
    }
  }, [itineraryData, cityId, addTab, setActiveTab, tabs]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#020C16] flex flex-col items-center justify-center p-8 text-center space-y-6">
        <AlertCircle size={48} className="text-red-500" />
        <h1 className="text-2xl font-bold text-white uppercase tracking-widest">Resonance Not Found</h1>
        <p className="text-blue-100/40 max-w-md italic">This itinerary may have expired or the resonance link is invalid. Redirecting you to Discovery...</p>
        <button 
          onClick={() => router.push('/')}
          className="btn-primary px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest"
        >
          Return to Discovery
        </button>
      </div>
    );
  }

  // Once loaded (and tab added), we show the normal SPA layout
  return (
    <div className="flex flex-col min-h-screen bg-brand-900 overflow-hidden">
      <Navbar />
      <div className="flex-1 mt-20">
        <TabSystem />
      </div>
    </div>
  );
}
