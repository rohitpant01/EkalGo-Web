'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Star, Zap, Shield, Heart, 
  MapPin, X, Info, Lock, ArrowRight, Users, Sparkles 
} from 'lucide-react';
import { useModal } from '@/context/ModalContext';

const PROFILES = [
  { name: "Kanika", age: 26, location: "Delhi", bio: "Explorer at heart 🌍 Mountains > Everything 🏔️", tags: ["MOUNTAINS", "ROADTRIPS"], image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600" },
  { name: "Aryan", age: 28, location: "Mumbai", bio: "Chasing sunsets and secret beaches 🌊 Surf's up!", tags: ["SURFING", "BEACHES"], image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600" },
  { name: "Isha", age: 24, location: "Bangalore", bio: "Coffee enthusiast and hidden gem hunter ☕️✨", tags: ["CAFES", "NIGHTLIFE"], image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600" },
  { name: "Rohan", age: 27, location: "Pune", bio: "Life is better at 15,000 feet ⛰️ Professional trekker.", tags: ["CLIMBING", "STARS"], image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600" },
  { name: "Meera", age: 23, location: "Jaipur", bio: "Forts, heritage, and a lot of Chai ☕️", tags: ["HERITAGE", "FOOD"], image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600" },
  { name: "Ananya", age: 25, location: "Hyderabad", bio: "Techie by day, traveler by heart 💻✈️", tags: ["SOLO", "TECH"], image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600" },
  { name: "Sneha", age: 26, location: "Kolkata", bio: "Art, culture, and exploring the unknown.", tags: ["ART", "CULTURE"], image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=600" },
  { name: "Priya", age: 24, location: "Chennai", bio: "Coastal vibes and temple runs.", tags: ["COASTAL", "TEMPLES"], image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=600" },
  { name: "Aditi", age: 27, location: "Lucknow", bio: "Searching for the best Kebabs in India.", tags: ["FOODIE", "HISTORY"], image: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?auto=format&fit=crop&q=80&w=600" },
  { name: "Tara", age: 25, location: "Goa", bio: "Ocean child and yoga lover 🧘‍♀️🌊", tags: ["YOGA", "OCEAN"], image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600" },
  { name: "Kaira", age: 22, location: "Manali", bio: "Snow, mountains, and magic.", tags: ["SNOW", "CAMPING"], image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600" },
  { name: "Zoya", age: 26, location: "Indore", bio: "Street food and night markets.", tags: ["STREETFOOD", "NIGHT"], image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&q=80&w=600" },
  { name: "Riya", age: 24, location: "Ahmedabad", bio: "Modern traditionalist exploring roots.", tags: ["ROOTS", "TRAVEL"], image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=600" },
  { name: "Sanya", age: 25, location: "Chandigarh", bio: "Road trips and mountain air.", tags: ["DRIVING", "HILLS"], image: "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?auto=format&fit=crop&q=80&w=600" },
  { name: "Dia", age: 23, location: "Surat", bio: "Diamonds and destination weddings.", tags: ["STYLE", "EVENTS"], image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=600" },
  { name: "Myra", age: 26, location: "Shimla", bio: "Quiet mornings and mountain views.", tags: ["QUIET", "NATURE"], image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&q=80&w=600" },
  { name: "Amara", age: 27, location: "Guwahati", bio: "Gateway to the Northeast explorer.", tags: ["TREK", "OFFBEAT"], image: "https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&q=80&w=600" },
  { name: "Navya", age: 24, location: "Kochi", bio: "Backwaters and spices.", tags: ["WATER", "SPICE"], image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600" },
  { name: "Sia", age: 25, location: "Udaipur", bio: "Palaces and lake views.", tags: ["PALACE", "LAKES"], image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=600" },
  { name: "Vanya", age: 22, location: "Bhopal", bio: "Lakes and history.", tags: ["HISTORY", "NATURE"], image: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?auto=format&fit=crop&q=80&w=600" },
  { name: "Kiara", age: 26, location: "Patna", bio: "River views and rural heart.", tags: ["RIVER", "HEART"], image: "https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?auto=format&fit=crop&q=80&w=600" },
  { name: "Avni", age: 24, location: "Dehradun", bio: "Himalayan gateway girl.", tags: ["TREK", "PEACE"], image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&q=80&w=600" },
  { name: "Shanaya", age: 25, location: "Amritsar", bio: "Golden temple and good vibes.", tags: ["TEMPLE", "VIBES"], image: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&q=80&w=600" },
  { name: "Prisha", age: 23, location: "Rishikesh", bio: "Yoga, rafting, and peace.", tags: ["YOGA", "ADVENTURE"], image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600" },
  { name: "Aavya", age: 24, location: "Varanasi", bio: "Ghats and spiritual journey.", tags: ["SPIRITUAL", "GHATS"], image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600" }
];

export default function AppShowcase() {
  const [index, setIndex] = useState(0);
  const [discoverCount, setDiscoverCount] = useState(248);
  const { openWaitlist } = useModal();

  useEffect(() => {
    // Discovery growth logic
    const saved = localStorage.getItem('ekalgo_discover_count');
    let count = 248;
    if (saved) {
      count = parseInt(saved) + (Math.floor(Math.random() * 4) + 2);
    }
    localStorage.setItem('ekalgo_discover_count', count.toString());
    setDiscoverCount(count);

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PROFILES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-100/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Mobile Phone Mockup */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/18.5] h-auto">
              {/* Phone Frame */}
              <div className="absolute inset-0 border-[8px] md:border-[10px] border-slate-900 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl z-30 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-5 md:h-6 bg-slate-900 rounded-b-2xl" />
              </div>
              
              {/* Screen Content */}
              <div className="absolute inset-2 bg-slate-950 rounded-[2.2rem] overflow-hidden z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="h-full w-full relative group"
                  >
                    {/* Profile Image with refined glimpse blur */}
                    <img 
                      src={PROFILES[index].image} 
                      className="w-full h-full object-cover blur-md scale-105 opacity-80" 
                      alt={PROFILES[index].name}
                    />
                    
                    {/* Locked Overlay (Subtle curiosity) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[1px] z-20">
                       <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mb-3 shadow-2xl">
                         <Lock size={20} className="text-white" />
                       </div>
                       <p className="text-[9px] font-black tracking-[0.2em] text-white uppercase opacity-80">Waitlist Only</p>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-25" />
                    
                    {/* Profile Info Overlay (High Fidelity) */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 pt-20 pb-24 text-white z-30">
                      <div className="flex items-end gap-2 mb-2">
                        <h4 className="text-3xl font-display font-black tracking-tight">{PROFILES[index].name}</h4>
                        <span className="text-2xl font-medium text-white/80 mb-0.5">{PROFILES[index].age}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-white/90 text-sm mb-4 font-medium">
                        <MapPin size={14} className="text-primary-400" />
                        <span>{PROFILES[index].location}</span>
                      </div>
                      
                      <p className="text-sm text-white/80 leading-relaxed mb-6 font-medium line-clamp-2">
                        {PROFILES[index].bio}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {PROFILES[index].tags.map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[9px] font-black tracking-[0.1em] border border-white/10 uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons (High Fidelity - Colorful) */}
                    <div className="absolute bottom-6 left-0 right-0 px-6 flex items-center justify-between z-30">
                      <div className="flex items-center gap-3">
                         <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-rose-500 shadow-xl border border-slate-100 active:scale-90 transition-transform cursor-pointer">
                           <X size={24} strokeWidth={3} />
                         </div>
                         <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-amber-500 shadow-lg border border-slate-100 active:scale-90 transition-transform cursor-pointer">
                           <Star size={18} fill="currentColor" />
                         </div>
                         <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-teal-500 shadow-xl border border-slate-100 active:scale-90 transition-transform cursor-pointer">
                           <Heart size={24} fill="currentColor" />
                         </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-transform cursor-pointer">
                        <Info size={16} />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Decorative Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -right-12 top-1/4 z-40 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden xl:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Discover</p>
                    <p className="text-xs font-bold text-slate-900">{discoverCount} New People Today</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="badge badge-primary mb-4">Discovery App</div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
                Connect With <br />
                <span className="text-gradient-primary">Verified Travelers</span>
              </h2>
              <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                Join our exclusive community of {discoverCount}+ explorers. Browse profiles, check itinerary compatibility, and find your next travel partner.
              </p>

              <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 mb-12">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary-500 flex items-center justify-center text-white shadow-glow-primary">
                       <Users size={24} />
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900">Private Community</h4>
                       <p className="text-sm text-slate-500">Only verified waitlist members can view full profiles.</p>
                    </div>
                 </div>
                 <button 
                  onClick={() => openWaitlist()}
                  className="w-full btn-primary py-4 rounded-2xl text-sm font-bold shadow-premium"
                 >
                   Join to Unlock Profiles <ArrowRight size={16} />
                 </button>
              </div>

              <div className="flex flex-wrap gap-4 pt-4 grayscale opacity-40">
                <div className="h-12 w-32 bg-slate-200 rounded-xl animate-pulse" />
                <div className="h-12 w-32 bg-slate-200 rounded-xl animate-pulse" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
