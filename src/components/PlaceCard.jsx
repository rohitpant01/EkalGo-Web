import React, { useState } from 'react';
import { MapPin, Star, Clock, Lightbulb, ImageOff, Users, Unlock, MousePointer2 } from 'lucide-react';
import { motion } from 'framer-motion';

const TYPE_COLORS = {
  temple: { bg: 'rgba(255,107,53,0.15)', text: '#F59E0B', label: '🛕 Temple' },
  trek: { bg: 'rgba(46,204,113,0.15)', text: '#2ECC71', label: '🥾 Trek' },
  viewpoint: { bg: 'rgba(14,165,233,0.15)', text: '#0EA5E9', label: '🔭 Viewpoint' },
  market: { bg: 'rgba(228,178,80,0.15)', text: '#F9A826', label: '🛒 Market' },
  restaurant: { bg: 'rgba(255,107,53,0.15)', text: '#F59E0B', label: '🍽️ Food' },
  default: { bg: 'rgba(45,212,191,0.15)', text: '#2DD4BF', label: '📍 Place' },
};

export default function PlaceCard({ place, locked = false, onLockedClick, travelersCount = Math.floor(Math.random() * 10) + 3 }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [scratched, setScratched] = useState(false);
  const typeStyle = TYPE_COLORS[place.type] || TYPE_COLORS.default;

  const hasPhoto = place.photoUrl && !imgError;

  return (
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
      onClick={locked ? onLockedClick : undefined}
      onMouseEnter={() => locked && setScratched(true)}
      onMouseLeave={() => locked && setScratched(false)}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(228,178,80,0.15) 0%, transparent 70%)',
        }} />

      {/* Image area */}
      <div className="relative h-48 overflow-hidden bg-ocean-800">
        {hasPhoto ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 shimmer" style={{ background: 'rgba(6,76,132,0.4)' }} />
            )}
            <img
              src={place.photoUrl}
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
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg"
            style={{ background: typeStyle.bg, color: typeStyle.text, backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {typeStyle.label}
          </span>
          {place.rating && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full shadow-lg"
              style={{ background: 'rgba(2,26,44,0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Star size={10} className="text-amber-400 fill-amber-400" />
              <span className="text-[10px] font-bold text-white">{place.rating}</span>
            </div>
          )}
        </div>

        {/* Travelers Count */}
        <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-2 shadow-lg"
          style={{ background: 'rgba(2,26,44,0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Users size={12} className="text-teal-400" />
          {travelersCount} travelers going
        </div>

        {/* Locked overlay */}
        {locked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-md transition-all group-hover:bg-black/10">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/40">
                <Unlock size={20} className="text-amber-400" />
              </div>
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest bg-amber-900/40 px-2 py-1 rounded-md">
                Locked in App
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-display font-bold text-white text-lg leading-tight mb-2 group-hover:text-amber-400 transition-colors">
            {place.name}
          </h3>
          <div className="flex items-center gap-1.5 opacity-50">
            <MapPin size={12} className="text-blue-300" />
            <span className="text-[10px] text-blue-100 font-medium uppercase tracking-wider">{place.address || 'Location Hidden'}</span>
          </div>
        </div>

        {/* Scratch to Reveal Area */}
        <div className="relative group/scratch">
          <p className={`text-xs leading-relaxed transition-all duration-500 ${locked && !scratched ? 'blur-[8px] select-none text-blue-200/20' : 'text-blue-200/50'}`}>
            {place.description || 'Discover the secret stories and hidden corners of this amazing travel destination only on the EkalGo mobile application.'}
          </p>
          {locked && !scratched && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                   <MousePointer2 size={12} /> Hover to peek
                </div>
             </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 py-1 px-3 rounded-lg bg-teal-500/5 border border-teal-500/10">
            <Clock size={12} className="text-teal-400" />
            <span className="text-[10px] font-bold text-teal-300 uppercase">{place.duration || '2 hours'}</span>
          </div>
        </div>

        {place.proTip && !locked && (
          <div className="p-3 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex gap-3">
             <div className="shrink-0 w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Lightbulb size={16} />
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500/60 mb-0.5">Insider Pro-Tip</span>
                <span className="text-xs text-amber-200/80 leading-relaxed italic">"{place.proTip}"</span>
             </div>
          </div>
        )}
        
        {locked && (
           <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">App Exclusive</span>
              <button className="text-[10px] font-bold text-amber-400 hover:text-amber-300">Unlock It 🔒</button>
           </div>
        )}
      </div>
    </motion.div>
  );
}
