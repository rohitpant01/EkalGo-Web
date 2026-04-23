'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Hotel, Utensils, Car, Wallet, AlertCircle, 
  CheckCircle2, Sparkles, TrendingDown, Info, 
  ArrowRight, ShieldCheck, Zap
} from 'lucide-react';
import Link from 'next/link';

const OPTIONS = {
  hotel: [
    { id: 'h1', label: 'Hostel / Pod', cost: 1500, icon: '🏠', vibe: 65 },
    { id: 'h2', label: 'Boutique Hotel', cost: 4500, icon: '🏨', vibe: 88 },
    { id: 'h3', label: 'Luxury Resort', cost: 12000, icon: '🏰', vibe: 98 },
  ],
  food: [
    { id: 'f1', label: 'Street Food', cost: 800, icon: '🍢', vibe: 75 },
    { id: 'f2', label: 'Local Cafes', cost: 2500, icon: '☕', vibe: 92 },
    { id: 'f3', label: 'Fine Dining', cost: 6000, icon: '🍷', vibe: 95 },
  ],
  transport: [
    { id: 't1', label: 'Public / Bus', cost: 500, icon: '🚌', vibe: 40 },
    { id: 't2', label: 'Rent a Bike', cost: 1200, icon: '🏍️', vibe: 85 },
    { id: 't3', label: 'Private Cab', cost: 3500, icon: '🚗', vibe: 70 },
  ]
};

export default function EnhancedBudgetDemo() {
  const [selections, setSelections] = useState({
    hotel: OPTIONS.hotel[1],
    food: OPTIONS.food[1],
    transport: OPTIONS.transport[1]
  });
  
  const [vibeMode, setVibeMode] = useState(false);
  const totalBudget = 10000;
  
  // High Vibe Mode logic: subtly adjust selections to better ones if budget allows
  useEffect(() => {
    if (vibeMode) {
      // Example logic: if we are well under budget, upgrade transport
      if (selections.transport.id === 't1') {
        setSelections(prev => ({ ...prev, transport: OPTIONS.transport[1] }));
      }
    }
  }, [vibeMode]);

  const currentTotal = selections.hotel.cost + selections.food.cost + selections.transport.cost;
  const avgVibe = Math.round((selections.hotel.vibe + selections.food.vibe + selections.transport.vibe) / 3);
  const percentage = Math.min((currentTotal / totalBudget) * 100, 110);
  
  let status = 'safe';
  if (percentage > 90) status = 'danger';
  else if (percentage > 70) status = 'warning';

  const statusColors = {
    safe: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500'
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Selection Control Panel (Left) */}
      <div className="lg:col-span-8 space-y-8">
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-slate-100 p-6 md:p-12">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-12">
            <div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 mb-2">Build Your Trip</h3>
              <p className="text-slate-500 text-xs md:text-sm">Select options to see real-time budget impacts.</p>
            </div>
            
            {/* Vibe Mode Toggle */}
            <button 
              onClick={() => setVibeMode(!vibeMode)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 transition-all ${
                vibeMode 
                  ? 'border-primary bg-primary/5 text-primary' 
                  : 'border-slate-100 bg-slate-50 text-slate-400'
              }`}
            >
              <Sparkles size={18} className={vibeMode ? 'animate-pulse' : ''} />
              <span className="font-bold text-xs uppercase tracking-widest">AI Vibe Boost</span>
              <div className={`w-8 h-4 rounded-full relative transition-colors ${vibeMode ? 'bg-primary' : 'bg-slate-200'}`}>
                <div className={`absolute top-1 w-2 h-2 bg-white rounded-full transition-all ${vibeMode ? 'left-5' : 'left-1'}`} />
              </div>
            </button>
          </div>

          <div className="space-y-12">
            {Object.entries(OPTIONS).map(([key, items]) => (
              <div key={key}>
                <p className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                  {key === 'hotel' && <Hotel size={16} />}
                  {key === 'food' && <Utensils size={16} />}
                  {key === 'transport' && <Car size={16} />}
                  {key} Selection
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelections(prev => ({ ...prev, [key]: item }))}
                      className={`group relative flex flex-col p-5 md:p-6 rounded-2xl md:rounded-3xl border-2 transition-all text-left ${
                        selections[key].id === item.id 
                          ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' 
                          : 'border-slate-50 bg-slate-50/50 hover:border-slate-200'
                      }`}
                    >
                      <span className="text-2xl md:text-3xl mb-3 md:mb-4">{item.icon}</span>
                      <h4 className={`font-bold mb-1 text-sm md:text-base ${selections[key].id === item.id ? 'text-slate-900' : 'text-slate-500'}`}>
                        {item.label}
                      </h4>
                      <div className="flex items-center justify-between mt-auto pt-3 md:pt-4 border-t border-slate-200/50">
                        <span className="text-xs md:text-sm font-display font-bold text-slate-900">₹{item.cost.toLocaleString()}</span>
                        <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-slate-400">
                          <Zap size={10} className="text-amber-500" />
                          {item.vibe}%
                        </div>
                      </div>
                      
                      {selections[key].id === item.id && (
                        <motion.div 
                          layoutId={`active-${key}`}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-lg"
                        >
                          <CheckCircle2 size={14} />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Dashboard (Right Sidebar) */}
      <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
        
        {/* Budget Summary Card */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="noise-bg absolute inset-0 opacity-10" />
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Live Trip Score</p>
            <div className="flex items-baseline gap-2 md:gap-3 mb-6 md:mb-8">
              <span className="text-4xl md:text-5xl font-display font-bold">₹{currentTotal.toLocaleString()}</span>
              <span className="text-xs md:text-sm font-medium text-white/40 mb-1 md:mb-2">/ daily</span>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="uppercase opacity-60">Budget Utilization</span>
                  <span>{Math.round(percentage)}%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className={`h-full rounded-full ${percentage > 100 ? 'bg-rose-500' : 'bg-primary'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <p className="text-[10px] font-bold text-white/40 uppercase mb-1">Vibe Score</p>
                  <p className="text-xl font-display font-bold text-primary">{avgVibe}%</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <p className="text-[10px] font-bold text-white/40 uppercase mb-1">Savings</p>
                  <p className="text-xl font-display font-bold text-emerald-400">₹{(totalBudget - currentTotal > 0 ? totalBudget - currentTotal : 0).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <h4 className="font-bold text-slate-900">Smart Recommendation</h4>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {status === 'danger' ? (
                <>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    You're exceeding your budget by <span className="font-bold text-rose-500">₹{(currentTotal - totalBudget).toLocaleString()}</span>. 
                  </p>
                  <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 flex gap-3">
                    <AlertCircle className="text-rose-500 flex-shrink-0" size={18} />
                    <p className="text-xs text-rose-700 font-medium leading-relaxed">
                      EkalGo suggests switching to <span className="font-bold">Local Cafes</span> to save ₹3,500 while maintaining a 90% vibe score.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Great choice! You have <span className="font-bold text-emerald-500">₹{(totalBudget - currentTotal).toLocaleString()}</span> left for today.
                  </p>
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-3">
                    <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={18} />
                    <p className="text-xs text-emerald-700 font-medium leading-relaxed">
                      Your current plan is highly optimized for Manali. You're saving more than 85% of travelers.
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <Link 
            href="/explore"
            className="w-full mt-8 py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center gap-2 group"
          >
            Generate Full Itinerary <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}
