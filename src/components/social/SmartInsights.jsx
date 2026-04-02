'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, Zap, MessageSquare, Lightbulb, MapPin, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SmartInsights({ destination }) {
  const [insightData, setInsightData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!destination) return;

    const fetchInsight = async () => {
      setLoading(true);
      try {
        const response = await axios.post('/api/itinerary', {
          type: 'suggestion',
          destination
        });
        setInsightData(response.data);
      } catch (err) {
        console.error('Gemini insight failed:', err);
      }
      setLoading(false);
    };

    fetchInsight();
  }, [destination]);

  if (loading) {
    return (
      <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center gap-3">
         <Loader2 size={16} className="text-accent-gold animate-spin" />
         <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Hydrating EkalGo Insights...</span>
      </div>
    );
  }

  if (!insightData) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
       <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-xl bg-accent-neon/10 flex items-center justify-center text-accent-neon border border-accent-neon/20">
             <Sparkles size={16} />
          </div>
          <div>
             <h4 className="text-xs font-bold text-white uppercase tracking-widest">EkalGo Vibe Check</h4>
             <p className="text-[9px] text-accent-neon font-bold uppercase tracking-widest leading-none">Smart Assistant v1.5</p>
          </div>
       </div>

       <div className="glass-panel p-5 bg-accent-neon/[0.03] border-accent-neon/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-neon/5 blur-[40px] pointer-events-none" />
          
          <div className="space-y-4">
             <p className="text-sm text-white/80 leading-relaxed italic">
                "{insightData.vibeCheck}"
             </p>

             <div className="grid grid-cols-1 gap-3">
                {insightData.insights?.map((insight, idx) => (
                   <div key={idx} className="flex gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-accent-neon/30 transition-colors">
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-accent-neon/10 flex items-center justify-center text-accent-neon">
                         {insight.type === 'food' ? <Zap size={14} /> : <Lightbulb size={14} />}
                      </div>
                      <div className="space-y-1">
                         <span className="text-[10px] font-bold text-accent-neon uppercase tracking-widest">{insight.title}</span>
                         <p className="text-xs text-white/60 leading-snug">{insight.text}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </motion.div>
  );
}
