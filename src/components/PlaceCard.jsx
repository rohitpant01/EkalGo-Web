import React, { useState } from 'react';
import { MapPin, Star, Clock, Lightbulb, ImageOff, Users, Unlock, MousePointer2, Sparkles, Zap, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useModal } from '@/context/ModalContext';

const TYPE_COLORS = {
  beach: { bg: 'rgba(14,165,233,0.15)', text: '#0EA5E9', label: '🏖️ Beach' },
  mountains: { bg: 'rgba(46,204,113,0.15)', text: '#2ECC71', label: '🏔️ Peak' },
  heritage: { bg: 'rgba(255,107,53,0.15)', text: '#F59E0B', label: '🏰 Royal' },
  nature: { bg: 'rgba(20,184,166,0.15)', text: '#14B8A6', label: '🌿 Nature' },
  spiritual: { bg: 'rgba(168,85,247,0.15)', text: '#A855F7', label: '🕉️ Spirit' },
  temple: { bg: 'rgba(255,107,53,0.15)', text: '#F59E0B', label: '🛕 Temple' },
  trek: { bg: 'rgba(46,204,113,0.15)', text: '#2ECC71', label: '🥾 Trek' },
  viewpoint: { bg: 'rgba(14,165,233,0.15)', text: '#0EA5E9', label: '🔭 View' },
  market: { bg: 'rgba(228,178,80,0.15)', text: '#F9A826', label: '🛒 Market' },
  restaurant: { bg: 'rgba(255,107,53,0.15)', text: '#F59E0B', label: '🍽️ Food' },
  default: { bg: 'rgba(45,212,191,0.15)', text: '#2DD4BF', label: '📍 Place' },
};
import Link from 'next/link';

export default function PlaceCard({ place, locked = false, travelersCount, onClick, href }) {
  const { openWaitlist } = useModal();
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [scratched, setScratched] = useState(false);
  const [displayTravelersCount, setDisplayTravelersCount] = useState(travelersCount || 10);

  React.useEffect(() => {
    if (!travelersCount) {
      // Only generate random count on client if not provided
      setDisplayTravelersCount(Math.floor(Math.random() * 10) + 5);
    }
  }, [travelersCount]);

  const typeStyle = TYPE_COLORS[place.type] || TYPE_COLORS.default;

  // Use a high-quality Unsplash image as a generic fallback if no photo is available or if it fails to load
  const fallbackImage = `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600`;
  const displayPhoto = imgError ? fallbackImage : (place.photoUrl || fallbackImage);
  const hasPhoto = !!displayPhoto;

  const content = (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer ${
        locked ? 'grayscale-[0.5]' : ''
      }`}
      style={{
        background: 'rgba(4,51,88,0.4)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)',
      }}
      onClick={!href ? onClick : undefined}
      onMouseEnter={() => locked && setScratched(true)}
      onMouseLeave={() => locked && setScratched(false)}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(228,178,80,0.15) 0%, transparent 70%)',
        }} />

      {/* Image area */}
      <div className={`relative ${locked ? 'h-64 sm:h-48' : 'h-48'} overflow-hidden bg-ocean-800 transition-all duration-500`}>
        {hasPhoto ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 shimmer" style={{ background: 'rgba(6,76,132,0.4)' }} />
            )}
            <img
              src={displayPhoto}
              alt={place.name}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              } ${locked ? 'blur-sm' : ''}`}
            />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-20">
            <ImageOff size={28} className="text-blue-300" />
            <span className="text-xs text-blue-300 font-mono">No photo available</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xl"
            style={{ 
              background: typeStyle.bg, 
              color: typeStyle.text, 
              backdropFilter: 'blur(16px)', 
              border: '1px solid rgba(255,255,255,0.1)',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}>
            {typeStyle.label}
          </span>
          {place.rating && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full shadow-xl"
              style={{ background: 'rgba(2,26,44,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Star size={10} className="text-accent-gold fill-accent-gold" />
              <span className="text-[10px] font-bold text-white">{place.rating}</span>
            </div>
          )}
        </div>

        {/* Travelers Count */}
        <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold text-white flex items-center gap-2 shadow-xl z-20"
          style={{ background: 'rgba(4,51,88,0.8)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Users size={13} className="text-accent-teal" />
          {displayTravelersCount} travelers going
        </div>

        {/* Locked overlay */}
        {locked && (
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 text-center">
            <div className="absolute inset-0 bg-brand-900/60 backdrop-blur-xl transition-all group-hover:bg-brand-900/40" />
            
            <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-accent-gold/20 flex items-center justify-center border border-accent-gold/40 shadow-glow-gold"
              >
                <Unlock size={24} className="text-accent-gold sm:hidden" />
                <Unlock size={28} className="text-accent-gold hidden sm:block" />
              </motion.div>
              
              <div className="space-y-1 sm:space-y-2">
                <h4 className="text-white font-display font-bold text-lg sm:text-xl leading-tight">
                  Available Only <br className="sm:hidden" /> <span className="text-gradient-gold">in EkalGo App</span>
                </h4>
                <p className="text-[10px] text-blue-100/60 font-medium uppercase tracking-[0.2em] hidden sm:block">
                  Exclusive Premium Feed
                </p>
              </div>

              <button 
                onClick={(e) => { e.stopPropagation(); openWaitlist(); }}
                className="btn-primary py-2 sm:py-2.5 px-6 sm:px-8 text-[10px] sm:text-xs shadow-glow-gold hover:scale-105 active:scale-95 transition-all font-bold flex items-center gap-2"
              >
                <Zap size={14} fill="currentColor" />
                Get Access
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-1">
            <h3 className={`font-display font-bold text-white text-xl leading-tight group-hover:text-accent-gold transition-colors flex items-center gap-2 ${locked ? 'blur-[4px] opacity-40 select-none' : ''}`}>
              {place.name}
              {!locked && (
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles size={16} className="text-accent-gold" />
                </motion.span>
              )}
            </h3>
            <div className={`flex items-center gap-1.5 opacity-50 ${locked ? 'blur-[2px] opacity-20' : ''}`}>
              <MapPin size={12} className="text-accent-neon" />
              <span className="text-[10px] text-blue-100 font-medium uppercase tracking-wider">{place.address || 'Location Hidden'}</span>
            </div>
          </div>

          {/* AI Glow Pulse Indicator */}
          {!locked && (
            <div className="relative flex items-center justify-center w-8 h-8">
               <motion.div 
                 animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="absolute inset-0 bg-accent-gold/20 rounded-full blur-md"
               />
               <div className="w-2 h-2 bg-accent-gold rounded-full shadow-glow-gold" />
            </div>
          )}
        </div>

        {/* Scratch to Reveal Area */}
        <div className="relative">
          <p className={`text-sm leading-relaxed transition-all duration-500 ${locked ? 'blur-[8px] select-none text-blue-200/20' : 'text-blue-200/50'}`}>
            {place.description || 'Discover the secret stories and hidden corners of this amazing travel destination only on the EkalGo platform.'}
          </p>
        </div>

        <div className={`flex items-center gap-4 ${locked ? 'blur-[4px] opacity-20' : ''}`}>
          <div className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-accent-teal/5 border border-accent-teal/10">
            <Clock size={12} className="text-accent-teal" />
            <span className="text-[10px] font-bold text-accent-teal uppercase tracking-widest">{place.duration || '2 hours'}</span>
          </div>
        </div>

        {place.proTip && !locked && (
          <div className="p-4 rounded-2xl bg-accent-gold/5 border border-accent-gold/10 flex gap-4">
             <div className="shrink-0 w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center text-accent-gold">
                <Lightbulb size={20} />
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-gold/60 mb-1">Insider Pro-Tip</span>
                <span className="text-sm text-accent-gold/80 leading-relaxed italic">"{place.proTip}"</span>
             </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
