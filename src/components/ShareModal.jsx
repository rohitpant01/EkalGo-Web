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
      color: 'bg-[#25D366] text-white',
      action: () => {
        const text = encodeURIComponent(`${data.text}\n\n${data.url}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
      }
    },
    {
      name: 'Email',
      icon: <Mail size={20} />,
      color: 'bg-primary-500 text-white',
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6" data-lenis-prevent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white border border-slate-100 rounded-[2rem] shadow-2xl overflow-hidden"
          >
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between pb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center border border-primary-100">
                  <Share className="text-primary-500" size={24} />
                </div>
                <div>
                   <h2 className="text-xl font-bold text-slate-900 font-display tracking-tight uppercase">Share Itinerary</h2>
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">EkalGo Engine</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Copy Link Section */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Itinerary Link</label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 truncate font-mono">
                    {data.url}
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className={`px-4 rounded-xl flex items-center justify-center transition-all ${
                      copied ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-slate-200'
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
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-soft transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-xl ${option.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                      {option.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-600">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
