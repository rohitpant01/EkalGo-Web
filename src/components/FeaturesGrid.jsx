import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Map, Compass, Shield, Sparkles, Navigation } from 'lucide-react';

const FEATURES = [
  {
    icon: Brain,
    title: 'AI Itinerary Generator',
    desc: 'Instantly generate optimized, day-by-day travel plans tailored exactly to your preferences and pace.',
    color: 'text-accent-neon'
  },
  {
    icon: Compass,
    title: 'Hidden Places Discovery',
    desc: 'Uncover secret spots, local gems, and offbeat trails that aren\'t swarming with tourists.',
    color: 'text-accent-gold'
  },
  {
    icon: Navigation,
    title: 'Smart Route Optimization',
    desc: 'Save time and money with AI-calculated routes that find the most efficient way to explore.',
    color: 'text-accent-teal'
  },
  {
    icon: Shield,
    title: 'Real-time Safety Insights',
    desc: 'Travel confidently with live safety alerts, verified paths, and community-driven trust scores.',
    color: 'text-gray-300'
  },
  {
    icon: Sparkles,
    title: 'Personalized Travel Plans',
    desc: 'From foodie tours to adventure sports, get recommendations that match your exact vibe.',
    color: 'text-accent-gold'
  },
  {
    icon: Map,
    title: 'Map Integration',
    desc: 'Seamlessly visualize your entire journey on interactive maps accessible offline.',
    color: 'text-accent-neon'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export default function FeaturesGrid() {
  return (
    <section id="how-it-works" className="py-6 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Powered by <span className="text-gradient-neon">Intelligence.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Everything you need to plan the perfect trip, handled by AI in seconds.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={idx}
                variants={itemVariants}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="glass-panel p-8 group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden cursor-pointer"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="bg-brand-800 border border-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={24} className={feature.color} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed min-h-[80px]">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
