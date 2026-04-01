import React, { useState, useEffect } from 'react';
import { Search, Loader2, Sparkles, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTIONS = [
  { label: "Delhi to Spiti (3 travelers going 👀)", icon: '🏔️' },
  { label: "Goa solo trip (Hidden beaches ✨)", icon: '🏖️' },
  { label: "Manali to Leh (Secret spots unlocked 🔒)", icon: '🏍️' },
  { label: "Rajasthan royal tour (12 group plans 🔥)", icon: '🏰' },
  { label: "Kerala backwaters (Romantic matches ❤️)", icon: '🌿' }
];

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SUGGESTIONS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (value.trim() && !loading) {
      onSearch(value.trim());
      setFocused(false);
    }
  };

  const handleSuggestion = (label) => {
    const cleanLabel = label.split(' (')[0];
    setValue(cleanLabel);
    onSearch(cleanLabel);
    setFocused(false);
  };

  return (
    <section id="search" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)' }}>
            <Sparkles size={13} className="text-teal-400" />
            <span className="text-xs font-mono font-medium tracking-widest uppercase text-teal-300">
              EkalGo Intelligence
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            Where do you want to <span className="text-gradient-amber italic">explore?</span>
          </h2>
          <p className="font-body text-blue-200/50 text-base">
            Describe your dream trip — our Ensemble AI reveals who's already there
          </p>
        </div>

        {/* Search input */}
        <form onSubmit={handleSubmit} className="relative">
          <div className={`relative transition-all duration-300 rounded-2xl overflow-visible ${
            focused ? 'shadow-glow' : ''
          }`}>
            {/* Gradient border trick */}
            <div className={`absolute -inset-px rounded-2xl transition-opacity duration-300 ${
              focused ? 'opacity-100' : 'opacity-0'
            }`}
              style={{ background: 'linear-gradient(135deg, rgba(228,178,80,0.5), rgba(14,165,233,0.3))' }} />

            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 px-3 sm:px-5 py-3 sm:py-4 rounded-2xl"
              style={{ background: 'rgba(4,51,88,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}>

              <div className="flex items-center gap-3 flex-1 min-w-0">
                <MapPin size={20} className="text-amber-400 flex-shrink-0" />

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 150)}
                    placeholder=""
                    className="w-full bg-transparent text-white text-sm sm:text-base font-body outline-none pointer-events-auto relative z-10 py-1"
                    disabled={loading}
                  />
                  {!value && (
                    <div className="absolute inset-0 flex items-center pointer-events-none text-blue-200/30 text-sm sm:text-base font-body overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={placeholderIndex}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="whitespace-nowrap"
                        >
                          {SUGGESTIONS[placeholderIndex].label}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {value && (
                  <button type="button" onClick={() => setValue('')}
                    className="p-1 text-blue-200/40 hover:text-white transition-colors relative z-10 flex-shrink-0">
                    <X size={16} />
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !value.trim()}
                className="flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 rounded-xl text-sm font-semibold text-ocean-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 sm:flex-shrink-0 relative z-10 w-full sm:w-auto"
                style={{ background: 'linear-gradient(135deg, #F9A826 0%, #F59E0B 100%)' }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Crafting...</span>
                  </>
                ) : (
                  <>
                    <Search size={16} />
                    <span>See who's going 👀</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Dropdown suggestions */}
          {focused && !loading && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-20 shadow-card-hover animate-slide-up"
              style={{ background: 'rgba(4,51,88,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="p-2">
                <p className="px-3 py-2 text-xs font-mono text-blue-200/40 uppercase tracking-wider">
                  Live Activity
                </p>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onMouseDown={() => handleSuggestion(s.label)}
                    className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-left text-sm font-body text-blue-100/70 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{s.icon}</span>
                      <span>{s.label.split(' (')[0]}</span>
                    </div>
                    <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20">
                      {s.label.split('(')[1]?.replace(')', '') || 'Trending'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </form>



        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center gap-3 mt-6 text-sm text-blue-200/50">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 dot-1 shadow-[0_0_8px_#F9A826]" />
              <span className="w-2 h-2 rounded-full bg-amber-400 dot-2 shadow-[0_0_8px_#F9A826]" />
              <span className="w-2 h-2 rounded-full bg-amber-400 dot-3 shadow-[0_0_8px_#F9A826]" />
            </div>
            <span className="font-body">Searching for travelers and hidden spots...</span>
          </div>
        )}
      </div>
    </section>
  );
}
