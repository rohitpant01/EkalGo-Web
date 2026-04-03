'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchItineraryById } from '@/utils/itineraryPersistence';
import { useTabStore } from '@/context/tabStore';
import TabSystem from '@/components/layout/TabSystem';
import Navbar from '@/components/Navbar';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';

export default function SharedItineraryPage() {
  const { city: cityId } = useParams();
  const router = useRouter();
  const { addTab, setActiveTab, tabs } = useTabStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadSharedItinerary() {
      if (!cityId) return;

      setLoading(true);
      const itineraryData = await fetchItineraryById(cityId);
      
      if (!itineraryData) {
        setError(true);
        setLoading(false);
        return;
      }

      // Check if this itinerary is already in tabs to prevent duplicates
      const tabId = `shared-${cityId}`;
      const existingTab = tabs.find(t => t.id === tabId);
      
      if (!existingTab) {
        addTab({
          id: tabId,
          title: itineraryData.title || 'Shared Trip',
          type: 'trip',
          data: { ...itineraryData, id: cityId } // Ensure ID is passed back for further sharing
        });
      }
      
      setActiveTab(tabId);
      setLoading(false);
    }

    loadSharedItinerary();
  }, [cityId, addTab, setActiveTab, tabs]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020C16] flex flex-col items-center justify-center p-8 text-center space-y-6">
        <div className="relative">
          <Loader2 size={48} className="text-accent-gold animate-spin" />
          <Sparkles size={20} className="absolute -top-2 -right-2 text-accent-gold animate-pulse" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-white uppercase tracking-widest">Rebuilding Itinerary...</h1>
          <p className="text-[10px] font-bold text-accent-gold uppercase tracking-[0.2em] animate-pulse">Syncing Surface Data</p>
        </div>
      </div>
    );
  }

  // Once loaded, we show the normal SPA layout with the shared itinerary active
  return (
    <div className="flex flex-col min-h-screen bg-brand-900 overflow-hidden">
      <Navbar />
      <div className="flex-1 mt-20">
        <TabSystem />
      </div>
    </div>
  );
}
