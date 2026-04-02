import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Sparkles, Navigation } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

const TRAVELERS = [
  {
    id: 1,
    name: "Ria Sharma",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    vibe: "Mountain Junkie",
    location: "Exploring Spiti",
    match: "98% Match"
  },
  {
    id: 2,
    name: "Vikram N.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    vibe: "Beach Bum",
    location: "Surfing in Varkala",
    match: "85% Match"
  },
  {
    id: 3,
    name: "Anita Desai",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    vibe: "Culture Nerd",
    location: "Lost in Varanasi",
    match: "92% Match"
  }
];

export default function Travelers() {
  const { openWaitlist } = useModal();
  return (
    <section className="py-24 bg-ocean-900 border-t border-white/5 relative overflow-hidden">
      {/* Decorative dots grid */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />

      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 glass border-blue-500/20">
          <User size={14} className="text-blue-400" />
          <span className="text-xs font-mono font-medium tracking-widest uppercase text-blue-300">
            Social Proof
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
          Travel solo, <span className="text-gradient-ocean italic">never alone</span>
        </h2>
        <p className="font-body text-blue-200/60 max-w-2xl text-lg mb-16">
          Find matching profiles, swipe right to connect, and share a cab, a trek, or just a coffee.
        </p>

        {/* Floating Cards Canvas */}
        <div className="w-full max-w-4xl h-[400px] relative flex justify-center items-center">
           
           {TRAVELERS.map((user, index) => {
             // Calculate staggered positions
             const positionX = index === 0 ? '-35%' : index === 1 ? '0%' : '35%';
             const positionY = index === 1 ? '-20px' : '20px';
             const zIndex = index === 1 ? 30 : 20;
             const scale = index === 1 ? 1.05 : 0.95;

             return (
               <motion.div
                 key={user.id}
                 animate={{ y: [parseInt(positionY), parseInt(positionY) - 15, parseInt(positionY)] }}
                 transition={{ 
                   duration: 4, 
                   repeat: Infinity, 
                   ease: "easeInOut", 
                   delay: index * 0.5 
                 }}
                 whileHover={{ scale: 1.1, zIndex: 40 }}
                 className="absolute w-[240px] sm:w-[280px] rounded-3xl p-4 glass-light border border-white/10 shadow-2xl cursor-pointer group"
                 style={{ 
                   left: '50%', 
                   top: '50%',
                   x: '-50%',
                   y: '-50%',
                   marginLeft: positionX,
                   marginTop: positionY,
                   zIndex,
                   transform: `scale(${scale})`
                 }}
                 onClick={openWaitlist}
               >
                 {/* Avatar */}
                 <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-amber-400 shadow-glow-amber">
                      {user.match}
                    </div>
                 </div>

                 <div className="text-left">
                    <h3 className="text-xl font-bold text-white mb-1">{user.name}</h3>
                    <div className="flex items-center gap-1.5 text-blue-200/50 mb-3">
                       <MapPin size={12} />
                       <span className="text-xs">{user.location}</span>
                    </div>

                    <div className="w-full py-2 bg-white/5 border border-white/10 rounded-xl flex justify-center items-center gap-2 group-hover:bg-blue-500 group-hover:text-white transition-colors text-blue-300">
                       <Navigation size={14} className="rotate-45" />
                       <span className="text-xs font-bold uppercase tracking-wider">Connect Now</span>
                    </div>
                 </div>
               </motion.div>
             );
           })}

        </div>

        {/* Fake Swipe Demo indicator */}
        <div className="mt-16 flex items-center justify-center gap-4 text-white/40 font-mono text-sm tracking-widest uppercase">
           <motion.div animate={{ x: [-10, 0, -10] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ❮❮ 
           </motion.div>
           Swipe left or right
           <motion.div animate={{ x: [10, 0, 10] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ❯❯
           </motion.div>
        </div>

      </div>
    </section>
  );
}
