import React from 'react';
import { UserPlus, Search, Heart, Plane } from 'lucide-react';

const STEPS = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Create Profile',
    desc: 'Sign up with email or phone. Add your travel style, interests, and dream destinations.',
    color: '#F9A826',
  },
  {
    icon: Search,
    number: '02',
    title: 'Plan Your Trip',
    desc: 'Type your destination — AI generates a complete personalized itinerary in seconds.',
    color: '#2DD4BF',
  },
  {
    icon: Heart,
    number: '03',
    title: 'Match & Connect',
    desc: 'Swipe through travelers going to the same place. Match, chat, plan together.',
    color: '#F59E0B',
  },
  {
    icon: Plane,
    number: '04',
    title: 'Travel Together',
    desc: 'Meet your travel soulmate, explore hidden gems, and create unforgettable memories.',
    color: '#A78BFA',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #0A7FDC, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(45,212,191,0.1)', border: '1px solid rgba(45,212,191,0.2)' }}>
            <span className="text-xs font-mono font-medium tracking-widest uppercase text-teal-400">
              How It Works
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            Solo travel, <span className="text-gradient-ocean italic">simplified</span>
          </h2>
          <p className="text-blue-200/50 max-w-lg mx-auto">
            From signup to your first shared adventure — in 4 steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-[75%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)' }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
            {STEPS.map(({ icon: Icon, number, title, desc, color }) => (
              <div key={title} className="relative text-center group">
                {/* Circle */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 mx-auto transition-transform duration-300 group-hover:-translate-y-2"
                  style={{ background: `${color}15`, border: `2px solid ${color}30` }}>
                  <Icon size={24} style={{ color }} />

                  {/* Number badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold text-ocean-900"
                    style={{ background: color }}>
                    {number.slice(-1)}
                  </div>
                </div>

                <h3 className="font-display font-semibold text-white text-lg mb-3">
                  {title}
                </h3>
                <p className="text-sm text-blue-200/40 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
