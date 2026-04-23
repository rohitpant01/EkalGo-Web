'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    rating: 5,
    text: 'EkalGo completely changed how I plan my trips. The AI itinerary for Spiti Valley was perfect — every hidden gem, every offbeat stop. I felt like a local!',
  },
  {
    name: 'Arjun Mehta',
    location: 'Bangalore, India',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
    rating: 5,
    text: 'As a solo traveler, finding safe and interesting routes used to be stressful. EkalGo\'s safety insights and smart routes gave me the confidence to explore freely.',
  },
  {
    name: 'Neha Patel',
    location: 'Delhi, India',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    rating: 5,
    text: 'The hidden gems feature is incredible. We found a secret waterfall in Meghalaya that wasn\'t on any other platform. Our group trip was unforgettable!',
  },
  {
    name: 'Vikram Singh',
    location: 'Jaipur, India',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    rating: 5,
    text: 'I was skeptical about AI travel, but EkalGo proved me wrong. The budget optimization saved me almost ₹5,000 on my Rajasthan tour without compromising quality.',
  },
  {
    name: 'Ananya Iyer',
    location: 'Chennai, India',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mimi',
    rating: 5,
    text: 'Clean interface, fast results, and actually useful tips. It\'s the only app I use now for all my weekend getaways. Highly recommended!',
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextStep();
    }, 6000);
    return () => clearInterval(timer);
  }, [index]);

  const nextStep = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevStep = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-primary-100/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-accent-100/20 rounded-full blur-[100px]" />
      </div>

      <div className="container-tight relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="badge badge-accent mx-auto mb-4"
          >
            <Star size={14} className="fill-current" />
            <span>Community Stories</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6"
          >
            Loved by <span className="text-gradient-primary">Thousands</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-base md:text-xl max-w-2xl mx-auto"
          >
            Don't just take our word for it. Here's how explorers are discovering the world with EkalGo.
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative px-4 md:px-12">
          <div className="relative min-h-[380px] md:min-h-[320px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 }
                }}
                className="w-full"
              >
                <div className="card-glass p-8 md:p-12 relative overflow-hidden bg-white border border-slate-100 shadow-xl rounded-[2rem]">
                  {/* Quote decoration */}
                  <Quote className="absolute -top-4 -right-4 w-24 h-24 text-slate-50 opacity-40 pointer-events-none" />
                  
                  <div className="relative z-10">
                    {/* Stars */}
                    <div className="flex gap-1 mb-8">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed mb-10">
                      "{TESTIMONIALS[index].text}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary-400 rounded-full blur-md opacity-20" />
                        <img 
                          src={TESTIMONIALS[index].avatar} 
                          alt={TESTIMONIALS[index].name}
                          className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover relative z-10 border-2 border-white shadow-md"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-display font-bold text-slate-900 leading-none mb-1">
                          {TESTIMONIALS[index].name}
                        </h4>
                        <p className="text-sm text-slate-500 font-medium">
                          {TESTIMONIALS[index].location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-12">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    index === i ? 'w-8 bg-primary-500' : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={prevStep}
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary-600 hover:border-primary-400 hover:bg-primary-50 transition-all active:scale-95"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextStep}
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary-600 hover:border-primary-400 hover:bg-primary-50 transition-all active:scale-95"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Trust metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-24 pt-12 border-t border-slate-100 flex flex-wrap justify-center items-center gap-x-12 gap-y-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
        >
          <div className="flex items-center gap-2 font-display font-bold text-xl text-slate-400">
            <span className="text-2xl">4.9</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-current" />)}
            </div>
            <span className="text-sm font-sans font-medium">Rating on Store</span>
          </div>
          <div className="text-xl font-display font-bold text-slate-400 italic">Traveler's Choice 2026</div>
          <div className="text-xl font-display font-bold text-slate-400">Top 10 AI Travel Apps</div>
        </motion.div>
      </div>
    </section>
  );
}
