'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappNumber = "918474972007";
  const message = encodeURIComponent("Hi EkalGo, I want to know more about the AI travel platform.");

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-40 group"
    >
      {/* Outer Pulse */}
      <div className="absolute inset-0 bg-[#25D366] rounded-full blur-[10px] opacity-40 group-hover:opacity-80 animate-pulse" />
      <div className="absolute inset-[-10px] bg-[#25D366]/20 rounded-full blur-[20px] animate-ping" />

      {/* Main Button */}
      <div className="relative w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl border border-white/20 overflow-hidden">
        <MessageCircle size={32} fill="white" className="relative z-10" />
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
      </div>

      {/* Optional Tooltip */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-brand-800 border border-white/10 rounded-xl text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none tracking-tight">
        Chat with us 🚀
      </div>
    </motion.a>
  );
}
