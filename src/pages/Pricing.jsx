import React from 'react';
import { CreditCard, Rocket, Star, Heart, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pricing({ onWaitlistOpen }) {
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
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold tracking-wider uppercase mb-4 border border-amber-500/20">
            Subscription
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Invest in Your <span className="text-gradient-amber">Experiences</span>
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
              className={`glass p-8 rounded-[2.5rem] relative flex flex-col justify-between ${plan.popular ? 'border-amber-500/30 ring-2 ring-amber-500/20' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-ocean-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl">
                  Most Popular
                </div>
              )}
              
              <div>
                <div className="text-sm font-semibold text-amber-500 mb-2 uppercase tracking-wider">{plan.name}</div>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-display font-bold text-white">{plan.price}</span>
                  <span className="text-blue-100/30 text-sm">/month</span>
                </div>
                <p className="text-blue-100/60 mb-8 font-body">{plan.description}</p>
                <div className="space-y-4 mb-10">
                  {plan.features.map(f => (
                    <div key={f} className="flex gap-3 items-start group">
                      <div className="w-5 h-5 rounded-full bg-teal-500/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-teal-500/20 transition-all">
                        <Check size={12} className="text-teal-500" />
                      </div>
                      <span className="text-sm text-blue-100/50 group-hover:text-blue-100/80 transition-all">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={plan.cta === 'Join Waitlist' ? onWaitlistOpen : undefined}
                disabled={plan.cta === 'Current Tier'}
                className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 ${plan.active ? 'bg-gradient-to-r from-amber-500 to-ember text-ocean-900 shadow-lg shadow-ember/20 hover:scale-[1.02]' : 'bg-white/5 text-white/40 border border-white/5 cursor-not-allowed'}`}
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
