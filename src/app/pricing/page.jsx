'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useModal } from '@/context/ModalContext';

export default function PricingPage() {
  const { openWaitlist } = useModal();
  const plans = [
    {
      name: "Free Explorer",
      price: "$0",
      description: "Perfect for the curious traveler starting their data journey.",
      features: ["3 AI Itineraries/month", "Standard Places Data", "Waitlist for App", "Community Forum Access"],
      cta: "Current Tier",
      active: false
    },
    {
      name: "Solo Pro",
      price: "$9.99",
      description: "Everything you need for serious, frequent, off-beat exploration.",
      features: ["Unlimited AI Itineraries", "Real-time Google Maps", "Exclusive Destination Guides", "Offline Support"],
      cta: "Join Waitlist",
      active: true,
      popular: true
    },
    {
      name: "Global Guide",
      price: "$19.99",
      description: "Power tools for travel creators and professional guides.",
      features: ["Custom Branding", "Export to 4K PDF/Map", "Advanced Data Scraper Integration", "Priority Support"],
      cta: "Join Waitlist",
      active: false
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-brand-900 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-gold/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-gold/10 text-accent-gold text-xs font-bold tracking-wider uppercase mb-4 border border-accent-gold/20">
            Subscription
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Invest in Your <span className="text-gradient-gold">Experiences</span>
          </h1>
          <p className="text-blue-100/60 text-lg md:text-xl max-w-2xl mx-auto font-body">
            Start free, upgrade anytime. All premium plans are currently invite-only via our waitlist.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-panel p-8 rounded-[2.5rem] relative flex flex-col justify-between ${plan.popular ? 'border-accent-gold/30 ring-2 ring-accent-gold/10 scale-105 z-20' : 'scale-100 z-10'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-gold text-brand-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl">
                  Most Popular
                </div>
              )}
              
              <div>
                <div className="text-sm font-semibold text-accent-gold mb-2 uppercase tracking-wider">{plan.name}</div>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-display font-bold text-white">{plan.price}</span>
                  <span className="text-blue-100/30 text-sm">/month</span>
                </div>
                <p className="text-blue-100/60 mb-8 font-body">{plan.description}</p>
                <div className="space-y-4 mb-10">
                  {plan.features.map(f => (
                    <div key={f} className="flex gap-3 items-start group">
                      <div className="w-5 h-5 rounded-full bg-accent-teal/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent-teal/20 transition-all">
                        <Check size={12} className="text-accent-teal" />
                      </div>
                      <span className="text-sm text-blue-100/50 group-hover:text-blue-100/80 transition-all">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => plan.cta === 'Join Waitlist' && openWaitlist()}
                disabled={plan.cta === 'Current Tier'}
                className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 ${plan.active ? 'btn-primary' : 'bg-white/5 text-white/40 border border-white/5 cursor-not-allowed'}`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
           initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
           className="mt-20 text-center"
        >
          <p className="text-blue-100/30 text-sm font-body">All transactions are secured by 256-bit AES encryption. Beta users get 30% off forever upon launch.</p>
        </motion.div>
      </div>
    </div>
  );
}
