'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, MessageCircle, Mail, Share } from 'lucide-react';

export default function ShareModal({ isOpen, onClose, data }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(data.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={20} />,
      color: 'bg-[#25D366]',
      action: () => {
        const text = encodeURIComponent(`${data.text}\n\n${data.url}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
      }
    },
    {
      name: 'Email',
      icon: <Mail size={20} />,
      color: 'bg-accent-gold',
      action: () => {
        const subject = encodeURIComponent(data.title);
        const body = encodeURIComponent(`${data.text}\n\nCheck it out here: ${data.url}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
      }
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#010912]/90 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#0B0F1A] border border-white/5 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <div className="p-8 border-b border-white/5 flex items-center justify-between pb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent-gold/10 flex items-center justify-center border border-accent-gold/20">
                  <Share className="text-accent-gold" size={24} />
                </div>
                <div>
                   <h2 className="text-xl font-bold text-white font-display tracking-tight uppercase">Share Itinerary</h2>
                   <p className="text-[10px] font-bold text-accent-gold uppercase tracking-[0.2em] mt-1">EkalGo Discovery Engine</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Copy Link Section */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Itinerary Link</label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white/60 truncate font-mono">
                    {data.url}
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className={`px-4 rounded-xl flex items-center justify-center transition-all ${
                      copied ? 'bg-green-500 text-white' : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              {/* Social Options */}
              <div className="grid grid-cols-2 gap-4">
                {shareOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={option.action}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-xl ${option.color} flex items-center justify-center text-brand-900 shadow-lg group-hover:scale-110 transition-transform`}>
                      {option.icon}
                    </div>
                    <span className="text-xs font-bold text-white/60">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 blur-[80px] pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
