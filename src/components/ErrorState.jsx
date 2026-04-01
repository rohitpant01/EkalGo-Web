import React from 'react';
import { RefreshCw, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ErrorState({ error, onRetry }) {
  const isApiError = error === 'AI_ORCHESTRATION_FAILED' || error === 'GROQ_KEY_MISSING';
  
  if (isApiError) {
    return (
      <div className="py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto rounded-[3rem] glass p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Background Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-teal-500/10 opacity-30 animate-pulse" />
          
          <div className="relative z-10">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400 blur-2xl opacity-20 animate-pulse" />
                <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Sparkles size={32} className="text-amber-400 animate-bounce-slow" />
                </div>
              </div>
            </div>

            <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-4">
               ⚡ Too many explorers right now...
            </h2>
            <p className="text-blue-100/40 text-lg mb-10 leading-relaxed font-body italic">
               "Your trip is being prepared ✨. We're currently experiencing high demand from the community. Let's try again in a moment."
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRetry}
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-ocean-900 transition-all shadow-glow-amber"
              style={{ background: 'linear-gradient(135deg, #F9A826 0%, #F59E0B 100%)' }}
            >
              <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
              Prepare Journey Again
            </motion.button>
            
            <p className="mt-8 text-xs font-mono text-blue-200/20 uppercase tracking-widest">
               Ensemble AI • High Demand State
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // General Error (Network / Other)
  return (
    <div className="py-20 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto rounded-[2.5rem] glass p-10 border-red-500/10"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
            <AlertCircle size={28} />
          </div>
        </div>
        <h2 className="text-2xl font-display font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-blue-100/40 mb-8 font-body">We couldn't connect to our exploration servers. Please check your connection.</p>
        <button
          onClick={onRetry}
          className="w-full py-4 rounded-xl font-bold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
        >
          Try Again
        </button>
      </motion.div>
    </div>
  );
}
