'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Globe, Users, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';

const VALUES = [
  {
    icon: Heart,
    title: 'Passion for Travel',
    desc: 'We believe every journey should be extraordinary. Our platform is built by travelers, for travelers.',
    color: 'bg-rose-50 text-rose-500',
  },
  {
    icon: Target,
    title: 'AI-First Approach',
    desc: 'We leverage cutting-edge AI to provide personalized, intelligent recommendations that evolve with you.',
    color: 'bg-primary-50 text-primary-500',
  },
  {
    icon: Globe,
    title: 'Discover the Unseen',
    desc: 'We go beyond mainstream tourism to surface hidden gems, local secrets, and offbeat destinations.',
    color: 'bg-blue-50 text-blue-500',
  },
  {
    icon: Users,
    title: 'Community Driven',
    desc: 'Our platform thrives on real traveler insights, verified reviews, and a passionate community of explorers.',
    color: 'bg-accent-50 text-accent-600',
  },
];

const MILESTONES = [
  { year: '2024', title: 'Idea Born', desc: 'EkalGo was conceived as an AI travel companion for Indian explorers.' },
  { year: '2025', title: 'Alpha Launch', desc: 'First version tested with 500+ beta travelers across India.' },
  { year: '2026', title: 'Public Beta', desc: 'Opened waitlist and web platform with AI itinerary generation.' },
  { year: 'Next', title: 'Full Launch', desc: 'iOS & Android apps with travel buddy matching and group planning.' },
];

export default function AboutPage() {
  const { openWaitlist } = useModal();

  return (
    <div className="pt-[72px]">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-surface-alt to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-100/30 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container-tight relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge badge-primary mx-auto mb-6"
          >
            <Sparkles size={14} />
            <span>Our Story</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 max-w-3xl mx-auto"
          >
            Making Travel <br className="hidden sm:block" />
            <span className="text-gradient-primary">Smarter for Everyone</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            EkalGo is an AI-powered travel platform built in India, designed to help modern explorers discover hidden gems, plan smarter routes, and connect with fellow travelers.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-5">
                Our <span className="text-gradient-accent">Mission</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6 text-base md:text-lg">
                We started EkalGo because we were tired of generic travel advice and overcrowded tourist spots. We wanted a tool that truly understands individual travel preferences and surfaces the extraordinary places that most people never find.
              </p>
              <p className="text-slate-500 leading-relaxed text-base md:text-lg">
                Our mission is to democratize intelligent travel planning — making AI-powered discovery, safety insights, and community connections accessible to every explorer, regardless of their budget or experience.
              </p>
            </div>

            {/* Stats Card */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '10K+', label: 'Travelers', color: 'border-primary-200 bg-primary-50/50' },
                { value: '500+', label: 'Destinations', color: 'border-accent-200 bg-accent-50/50' },
                { value: '50K+', label: 'Routes Planned', color: 'border-blue-200 bg-blue-50/50' },
                { value: '4.9★', label: 'User Rating', color: 'border-amber-200 bg-amber-50/50' },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-6 rounded-2xl border ${stat.color} text-center`}
                >
                  <p className="text-3xl md:text-4xl font-display font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-surface-alt">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4">
              What Drives <span className="text-gradient-primary">Us</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">Core values that shape every feature we build.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {VALUES.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="card flex gap-4"
                >
                  <div className={`icon-box icon-box-lg rounded-xl ${value.color} flex-shrink-0`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-slate-900 mb-1.5">{value.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{value.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4">
              Our <span className="text-gradient-accent">Journey</span>
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-0">
            {MILESTONES.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-4 md:gap-6 relative"
              >
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    idx === MILESTONES.length - 1 
                      ? 'bg-primary-100 text-primary-600 ring-4 ring-primary-50' 
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {milestone.year}
                  </div>
                  {idx < MILESTONES.length - 1 && (
                    <div className="w-px h-full min-h-[40px] bg-slate-200 my-1" />
                  )}
                </div>

                <div className="pb-8">
                  <h3 className="text-base font-display font-semibold text-slate-900 mb-1">{milestone.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{milestone.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-surface-alt">
        <div className="container-tight text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-4">
            Be Part of the Journey
          </h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Join our growing community of explorers and get early access to new features.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => openWaitlist()} className="btn-primary w-full sm:w-auto px-8">
              Join the Waitlist
              <ArrowRight size={16} />
            </button>
            <Link href="/contact" className="btn-outline w-full sm:w-auto px-8">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
