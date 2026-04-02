'use client';

import React from 'react';
import {
  Calendar, Clock, DollarSign, Thermometer, Zap,
  Lock, Share2, Download, Sparkles, MapPin, Eye, Users, ArrowLeft,
  MessageCircle, CheckSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import PlaceCard from '../PlaceCard';
import SmartInsights from '../social/SmartInsights';
import { useModal } from '@/context/ModalContext';
import { useTabStore } from '@/context/tabStore';

const DIFF_COLORS = {
  Easy: { bg: 'rgba(46,204,113,0.15)', text: '#2ECC71' },
  Moderate: { bg: 'rgba(228,178,80,0.15)', text: '#F9A826' },
  Challenging: { bg: 'rgba(255,107,53,0.15)', text: '#F59E0B' },
};

export default function ItineraryView({ data }) {
  const { openWaitlist, openPreview } = useModal();
  const { removeTab, activeTabId } = useTabStore();
  
  const itinerary = data;

  if (!itinerary) return (
    <div className="p-20 text-center text-white/20 uppercase tracking-widest text-xs font-bold">
      Loading Trip Intelligence...
    </div>
  );

  const diffStyle = DIFF_COLORS[itinerary.difficulty] || DIFF_COLORS.Easy;

  const openSocial = (type) => {
    // These features are currently locked behind the waitlist
    openWaitlist();
  };

  return (
    <div className="w-full min-h-full bg-brand-900/20 pb-24">
      {/* Back / Close Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-brand-900/80 backdrop-blur-xl border-b border-white/5">
         <button 
           onClick={() => removeTab(activeTabId)}
           className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
         >
            <ArrowLeft size={14} />
            Back to Dashboard
         </button>
         <div className="flex items-center gap-3">
            <button 
              onClick={() => openSocial('chat')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-gold/10 text-accent-gold border border-accent-gold/20 text-[10px] font-bold uppercase tracking-widest hover:bg-accent-gold/20 transition-all"
            >
               <MessageCircle size={14} />
               Group Chat
            </button>
            <button 
              onClick={() => openSocial('shared')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-white/40 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all"
            >
               <CheckSquare size={14} />
               Shared Items
            </button>
            <button className="p-2 rounded-xl bg-white/5 text-white/40 hover:text-white transition-colors">
               <Share2 size={16} />
            </button>
         </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 pt-10 space-y-12">
        {/* Header Hero Section */}
        <section className="space-y-6">
           <div className="flex flex-wrap items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center gap-2">
                <Sparkles size={14} className="text-accent-gold animate-pulse" />
                <span className="text-[10px] font-bold text-accent-gold uppercase tracking-widest">AI Orchestrated</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 italic">
                <Users size={12} className="text-white/40" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">14 Live Members</span>
              </div>
           </div>
           
           <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-white leading-tight">
             {itinerary.title}
           </h1>
           <p className="text-lg text-white/40 italic leading-relaxed max-w-2xl">
             "{itinerary.summary}"
           </p>

           <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/5">
              {itinerary.duration && <Chip icon={<Calendar size={14} />} label={itinerary.duration} />}
              {itinerary.bestSeason && <Chip icon={<Thermometer size={14} />} label={itinerary.bestSeason} />}
              {itinerary.estimatedCost && <Chip icon={<DollarSign size={14} />} label={itinerary.estimatedCost} />}
              {itinerary.difficulty && (
                <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-bold tracking-wide"
                  style={{ background: diffStyle.bg, color: diffStyle.text, border: `1px solid ${diffStyle.text}20` }}>
                  <Zap size={12} />
                  {itinerary.difficulty.toUpperCase()}
                </span>
              )}
           </div>
        </section>

        {/* Smart AI Insights (Gemini) */}
        <section>
           <SmartInsights destination={itinerary.location || itinerary.title} />
        </section>

        {/* Days Navigation Sidebar / Inline */}
        <div className="space-y-16">
          {Array.isArray(itinerary.days) && itinerary.days.map((day, idx) => (
            <section key={idx} className="space-y-8">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-gold font-bold font-mono text-xl">
                    0{idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white">{day.theme || 'Exploration Day'}</h3>
                    <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent mt-2" />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {day.places?.map((place, pIdx) => (
                    <PlaceCard key={pIdx} place={place} />
                  ))}
               </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <section className="bg-accent-gold/[0.03] border border-accent-gold/20 p-12 rounded-[3rem] text-center space-y-6">
           <Zap size={48} className="text-accent-gold mx-auto animate-pulse" />
           <h2 className="text-3xl font-bold text-white">Ready to join this legendary route?</h2>
           <p className="text-white/40 italic">Sync with travelers, track budget, and unlock 12+ hidden nodes.</p>
           <button 
             onClick={openWaitlist}
             className="btn-primary px-10 py-5 rounded-2xl text-sm font-bold shadow-glow-gold hover:scale-105 transition-all"
           >
             Unlock Full Intelligence
           </button>
        </section>
      </div>
    </div>
  );
}

function Chip({ icon, label }) {
  return (
    <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest">
      <span className="text-accent-gold">{icon}</span>
      {label}
    </span>
  );
}
