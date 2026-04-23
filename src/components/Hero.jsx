'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin, Mail } from 'lucide-react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';

const DESTINATIONS = ["Goa", "Manali", "Rishikesh", "Ladakh", "Kerala"];

export default function Hero() {
  const { openWaitlist } = useModal();
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingInterval;

    const type = () => {
      const currentWord = DESTINATIONS[wordIndex];
      
      if (isDeleting) {
        setTypedText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          isDeleting = true;
          typingInterval = setInterval(type, 80);
        }, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % DESTINATIONS.length;
      }
    };

    typingInterval = setInterval(type, 120);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-surface-alt via-white to-white">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-50/50 rounded-full blur-[80px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container-tight pt-28 pb-16 md:pt-36 md:pb-24 flex flex-col items-center text-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="badge badge-primary mb-6"
        >
          <Sparkles size={14} />
          <span>AI-Powered Travel Platform</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 max-w-4xl"
        >
          <span className="text-slate-900">Discover Places</span>
          <br />
          <span className="text-gradient-primary">You Never Knew Existed</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed px-4"
        >
          AI-crafted itineraries, hidden gems, and smart routes tailored to your travel style. Plan effortlessly, explore endlessly.
        </motion.p>

        {/* Search Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-lg mx-auto mb-10 px-4"
        >
          <div className="relative flex items-center p-2 bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover hover:border-primary-300 transition-all duration-300">
            <div className="flex items-center flex-1 pl-4 gap-3">
              <MapPin className="text-primary-400 flex-shrink-0" size={20} />
              <div className="flex-1 h-12 flex items-center text-base">
                <span className="text-slate-400">Where to? </span>
                <span className="text-slate-800 font-medium ml-1">{typedText}</span>
                <span className="text-primary-400 animate-pulse ml-0.5">|</span>
              </div>
            </div>
            <Link
              href="/explore"
              className="btn-primary rounded-xl px-5 py-3 text-sm shrink-0"
            >
              Explore
              <Sparkles size={14} />
            </Link>
          </div>
        </motion.div>

        {/* CTA Group */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full px-4"
        >
          <button
            onClick={() => openWaitlist()}
            className="btn-accent w-full sm:w-auto text-base px-8"
          >
            <Mail size={18} />
            Join the Waitlist
            <ArrowRight size={16} className="ml-1" />
          </button>
          <Link
            href="/explore"
            className="btn-outline w-full sm:w-auto text-base px-8"
          >
            <MapPin size={18} />
            Explore Routes
          </Link>
        </motion.div>

        {/* Trust Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center text-[10px] font-bold text-white overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=ekalgo${i}`} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span>Trusted by <strong className="text-slate-600">10,000+</strong> travelers</span>
          </div>
          <span className="hidden sm:block text-slate-300">•</span>
          <span>⭐ 4.9 rating</span>
        </motion.div>
      </div>
    </section>
  );
}
