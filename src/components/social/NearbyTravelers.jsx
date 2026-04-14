'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/utils/supabase';
import { useTabStore } from '@/context/tabStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MapPin, UserPlus, MessageCircle, ChevronRight } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

const INDIAN_FEMALE_NAMES = [
  'Ananya', 'Myra', 'Ishita', 'Kavya', 'Priya', 'Zara', 'Sanvi', 'Diya', 'Riya', 'Sara',
  'Amara', 'Isha', 'Ahana', 'Jhanvi', 'Kiara', 'Navya', 'Shanaya', 'Tanya', 'Vanya', 'Zoya'
];

export default function NearbyTravelers() {
  const user = useMemo(() => {
    if (typeof window === 'undefined') return { id: 'anon' };
    
    // For "Refresh" randomization, we'll use a session-specific guestId
    // If you refresh the tab, you get a new identity
    const sessionKey = `guest-${Math.random().toString(36).substr(2, 9)}`;
    const nameIndex = Math.floor(Math.random() * INDIAN_FEMALE_NAMES.length);
    const selectedName = INDIAN_FEMALE_NAMES[nameIndex];
    
    return { 
      id: sessionKey, 
      user_metadata: { 
        username: `${selectedName}_${sessionKey.split('-')[1].substr(0, 4)}` 
      } 
    };
  }, []);
  const { openWaitlist } = useModal();
  const [travelers, setTravelers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addTab } = useTabStore();

  useEffect(() => {
    // 1. Subscribe to Real-time Presence
    const channel = supabase.channel('online-travelers', {
      config: {
        presence: {
          key: user?.id || 'anon',
        },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const rawTravelers = Object.values(state).flat().map(p => {
           const travelerId = p.user_id || `anon-${Math.random().toString(36).substr(2, 9)}`;
           // Use a stable derivation for the name based on ID string
           const idSum = travelerId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
           const name = INDIAN_FEMALE_NAMES[idSum % INDIAN_FEMALE_NAMES.length];
           
           return {
             id: travelerId,
             username: p.username || name,
             level: p.level || Math.floor(Math.random() * 8) + 1,
             distance: 'Nearby',
             bio: p.bio || 'Exploring India...'
           };
        });

        // Deduplicate by ID
        const uniqueTravelers = Array.from(new Map(rawTravelers.map(t => [t.id, t])).values());
        
        setTravelers(uniqueTravelers.slice(0, 5)); // Show top 5
        setLoading(false);
      })
      .on('presence', { event: 'join', key: '*', }, ({ key, currentPresences }) => {
        console.log('join', key, currentPresences);
      })
      .on('presence', { event: 'leave', key: '*', }, ({ key, lastPresences }) => {
        console.log('leave', key, lastPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: user?.id,
            username: user?.user_metadata?.username || 'Traveler',
            level: 5, // Mock level for now
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const openProfile = (user) => {
    addTab({
      id: `profile-${user.id}`,
      title: `@${user.username}`,
      type: 'profile',
      data: user
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold border border-accent-gold/20">
               <Users size={20} />
            </div>
            <div>
               <h3 className="text-sm font-bold text-white uppercase tracking-widest">Pulse Network</h3>
               <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Explorers within 10km</p>
            </div>
         </div>
         <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[8px] font-bold uppercase tracking-widest animate-pulse">
            Live
         </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {travelers.map((traveler, idx) => (
            <motion.div
              key={traveler.id || `traveler-${idx}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative glass-panel p-4 border-white/5 hover:border-accent-gold/30 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer"
              onClick={() => openProfile(traveler)}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-brand-800 border border-white/10 overflow-hidden">
                     {/* Placeholder avatar */}
                     <div className="w-full h-full bg-gradient-to-br from-accent-gold/20 to-transparent" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-900 rounded-full flex items-center justify-center border border-white/5">
                     <span className="text-[8px] font-bold text-accent-gold">{traveler.level}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-accent-gold transition-colors">@{traveler.username}</h4>
                  <p className="text-[10px] text-white/40 truncate max-w-[120px]">{traveler.bio}</p>
                </div>

                <div className="text-right">
                   <div className="flex items-center gap-1 text-accent-gold/60">
                      <MapPin size={10} />
                      <span className="text-[9px] font-bold uppercase">{traveler.distance}</span>
                   </div>
                   <button className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight size={14} className="text-white/20" />
                   </button>
                </div>
              </div>

              {/* Action Quickbar (Teaser) */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                 <button className="p-2 rounded-lg bg-accent-gold text-brand-900 shadow-glow-gold hover:scale-110 transition-transform">
                    <UserPlus size={14} />
                 </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button 
        onClick={() => openWaitlist({
          title: "Broadcast Coming Soon",
          description: "We're bringing real-time broadcast and finding travel buddies to the web soon. Join the waitlist for early access."
        })}
        className="w-full py-3 rounded-xl border border-white/5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 hover:text-accent-gold/40 hover:bg-white/5 transition-all"
      >
         Broadcast My Location (Join Waitlist)
      </button>
    </div>
  );
}
