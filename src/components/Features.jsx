import React from 'react';
import { Heart, Map, MessageCircle, Shield, Compass, Zap } from 'lucide-react';

const FEATURES = [
  {
    icon: Heart,
    color: '#F59E0B',
    bgColor: 'rgba(255,107,53,0.1)',
    title: 'Travel Soulmate Matching',
    desc: 'Swipe through profiles of solo travelers. Match based on destination, travel style, and interests. Find your perfect co-traveler.',
    tag: 'Tinder for Travelers',
  },
  {
    icon: Zap,
    color: '#F9A826',
    bgColor: 'rgba(228,178,80,0.1)',
    title: 'AI Trip Planner',
    desc: 'Describe your dream trip in plain words. Our AI crafts a personalized day-by-day itinerary with real places, tips, and timings.',
    tag: 'Powered by Gemini AI',
  },
  {
    icon: Map,
    color: '#2DD4BF',
    bgColor: 'rgba(45,212,191,0.1)',
    title: 'Real-Time Discovery',
    desc: 'Find travelers nearby, discover hidden gems, and explore location-based recommendations — all tailored to where you are.',
    tag: 'Google Maps Powered',
  },
  {
    icon: MessageCircle,
    color: '#0A7FDC',
    bgColor: 'rgba(10,127,220,0.1)',
    title: 'Real-Time Chat',
    desc: 'Chat with your matches instantly. Share photos, coordinate meetups, and plan your adventure — with read receipts and typing indicators.',
    tag: 'Socket.io Live Chat',
  },
  {
    icon: Compass,
    color: '#2ECC71',
    bgColor: 'rgba(46,204,113,0.1)',
    title: 'Hidden Gems',
    desc: 'Skip the tourist traps. Access verified local secrets: offbeat trails, secret viewpoints, and authentic local eateries.',
    tag: 'Locals-Only Spots',
  },
  {
    icon: Shield,
    color: '#A78BFA',
    bgColor: 'rgba(167,139,250,0.1)',
    title: 'Verified & Safe',
    desc: 'Face verification via AWS Rekognition, OTP-verified phone numbers, and AI-powered safety checks keep every interaction secure.',
    tag: 'AWS Rekognition',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)' }}>
            <span className="text-xs font-mono font-medium tracking-widest uppercase text-ember">
              Why EkalGo
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            Everything a solo traveler <br className="hidden sm:block" />
            <span className="text-gradient-amber italic">actually needs</span>
          </h2>
          <p className="font-body text-blue-200/50 max-w-xl mx-auto">
            Built by solo travelers, for solo travelers. Every feature is designed around real travel pain points.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          {FEATURES.map(({ icon: Icon, color, bgColor, title, desc, tag }) => (
            <div key={title}
              className="group relative p-6 rounded-2xl card-lift transition-all duration-300 overflow-hidden"
              style={{ background: 'rgba(4,51,88,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at 20% 20%, ${color}10, transparent 60%)` }} />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: bgColor, border: `1px solid ${color}25` }}>
                  <Icon size={22} style={{ color }} />
                </div>

                {/* Tag */}
                <span className="text-xs font-mono uppercase tracking-widest mb-3 block"
                  style={{ color: `${color}80` }}>
                  {tag}
                </span>

                <h3 className="font-display font-semibold text-white text-lg mb-3 leading-snug">
                  {title}
                </h3>
                <p className="text-sm text-blue-200/50 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
