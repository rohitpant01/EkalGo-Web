import React from 'react';
import { motion } from 'framer-motion';
import { Search, BrainCircuit, Compass, PlaneTakeoff } from 'lucide-react';

const STEPS = [
  {
    icon: Search,
    title: 'Enter Destination',
    desc: 'Tell us where you want to go and your vibe.',
    color: 'from-accent-neon to-brand-800'
  },
  {
    icon: BrainCircuit,
    title: 'AI Generates Plan',
    desc: 'Our engine computes thousands of possibilities.',
    color: 'from-accent-gold to-brand-800'
  },
  {
    icon: Compass,
    title: 'Explore Hidden Gems',
    desc: 'Discover places algorithms rarely show.',
    color: 'from-accent-teal to-brand-800'
  },
  {
    icon: PlaneTakeoff,
    title: 'Travel with Confidence',
    desc: 'Enjoy verified routes and real-time alerts.',
    color: 'from-accent-gold to-brand-800'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden bg-brand-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 text-white"
          >
            How it <span className="text-gradient-gold">Works</span>
          </motion.h2>
          <p className="text-gray-400">Four simple steps to your ultimate journey.</p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[48px] left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-accent-neon via-accent-gold to-accent-teal opacity-30 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 z-10 relative">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex flex-col items-center text-center relative group"
                >
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 bg-gradient-to-br ${step.color} p-[1px] group-hover:scale-110 transition-transform duration-300 shadow-glass-card`}>
                    <div className="w-full h-full rounded-full bg-brand-900 flex items-center justify-center">
                      <Icon size={32} className={idx % 2 === 0 ? 'text-accent-neon' : 'text-accent-gold'} />
                    </div>
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute top-0 right-1/2 translate-x-10 -translate-y-2 w-8 h-8 rounded-full bg-brand-800 border-2 border-brand-900 flex items-center justify-center text-sm font-bold text-white shadow-lg z-20">
                    {idx + 1}
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm max-w-[200px]">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
