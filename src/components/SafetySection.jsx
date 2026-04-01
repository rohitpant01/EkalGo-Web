import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Map, BellRing } from 'lucide-react';

export default function SafetySection() {
  return (
    <section className="py-24 relative overflow-hidden bg-brand-800">
      <div className="absolute inset-0 bg-glass pointer-events-none opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 glass-panel border border-accent-teal/20"
            >
              <ShieldCheck size={14} className="text-accent-teal" />
              <span className="text-xs font-semibold tracking-wide uppercase text-accent-teal uppercase">
                Bank-Grade Security
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              Travel with total <span className="text-gradient-teal border-b-2 border-accent-teal pb-1 inline-block">Peace of Mind.</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg mb-10 leading-relaxed"
            >
              We prioritize your safety above all else. With real-time AI monitoring and verified crowdsourced data, you can explore freely knowing we've got your back.
            </motion.p>

            <motion.ul 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                { icon: ShieldCheck, title: "Verified Routes", desc: "Paths checked and rated by a curated trust network." },
                { icon: BellRing, title: "Real-time Alerts", desc: "Instant push notifications for weather or crowd surges." },
                { icon: Map, title: "Offline Maps", desc: "Never rely on a spotty cell connection again." }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    viewport={{ once: true }}
                    className="flex gap-4 items-start group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-teal/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon size={24} className="text-accent-teal" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{item.title}</h4>
                      <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>

          {/* Right Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[500px] w-full max-w-lg mx-auto lg:ml-auto"
          >
            {/* abstract glowing orb showing 'trust' shield */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/20 to-brand-900 rounded-[2rem] border border-white/5 flex items-center justify-center overflow-hidden shadow-glow-neon">
              {/* background grids/lines */}
              <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle at center, rgba(20, 184, 166, 0.5) 0%, transparent 70%), linear-gradient(rgba(20, 184, 166, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 184, 166, 0.2) 1px, transparent 1px)',
                  backgroundSize: '100% 100%, 40px 40px, 40px 40px',
                }} 
              />
              
              <div className="relative z-10 text-center animate-float">
                <div className="w-32 h-32 rounded-full glass-panel flex items-center justify-center mb-6 shadow-glow-neon mx-auto">
                  <ShieldCheck size={56} className="text-accent-teal" />
                </div>
                <div className="glass-panel py-3 px-6 rounded-lg border-accent-teal/40">
                  <p className="text-white font-mono font-medium tracking-widest text-sm">STATUS: SECURE</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
