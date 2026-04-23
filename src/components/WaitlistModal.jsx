"use client";

import React, { useState } from 'react';
import { X, Mail, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { addToWaitlist } from '../utils/waitlist';

export default function WaitlistModal({ 
  isOpen, 
  onClose, 
  title = "Join the Waitlist", 
  description = "Be the first to know when EkalGo launches. Get exclusive early access + special features." 
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    setErrorMsg('');

    // Small delay for UX feel
    await new Promise((r) => setTimeout(r, 600));

    const result = await addToWaitlist(email.trim());

    if (result.success) {
      setStatus('success');
    } else if (result.alreadyExists) {
      setStatus('already_joined');
    } else {
      setStatus('error');
      setErrorMsg(result.error);
    }
  };

  const handleClose = () => {
    setEmail('');
    setStatus('idle');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 modal-backdrop"
      data-lenis-prevent
      style={{ background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}>

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100"
      >
        <div className="relative p-6 md:p-8">
          {status !== 'success' && status !== 'already_joined' ? (
            <>
              <div className="text-center mb-6 md:mb-8">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary-50 text-primary-500 flex items-center justify-center mx-auto mb-4 border border-primary-100">
                  <Mail size={22} className="md:w-6 md:h-6" />
                </div>
                <h2 className="font-display text-xl md:text-2xl font-bold text-slate-900 mb-2">
                  {title}
                </h2>
                <p className="text-slate-500 text-xs md:text-sm">
                  {description}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
                    <Mail size={16} className="text-slate-400 flex-shrink-0" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      disabled={status === 'loading'}
                      className="flex-1 bg-transparent text-slate-900 placeholder:text-slate-400 text-sm outline-none"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-500 px-1">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading' || !email.trim()}
                  className="btn-primary w-full"
                >
                  {status === 'loading' ? (
                    <><Loader2 size={18} className="animate-spin" /> Joining...</>
                  ) : (
                    <><span>Join Waitlist</span><ArrowRight size={16} /></>
                  )}
                </button>
              </form>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 justify-center">
                {['🎁 Free early access', '🔕 No spam', '🚀 Launch updates'].map((item) => (
                  <span key={item} className="text-xs font-medium text-slate-400">{item}</span>
                ))}
              </div>
            </>
          ) : (
            // Success / Already Joined state
            <div className="text-center py-4 md:py-6">
              <div className="flex items-center justify-center mb-5 md:mb-6">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-emerald-50 text-emerald-500 border-2 border-emerald-100 flex items-center justify-center">
                  <CheckCircle size={30} className="md:w-9 md:h-9" />
                </div>
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-slate-900 mb-3">
                {status === 'success' ? "You're on the list! 🎉" : "You're already on the list! 👋"}
              </h2>
              <p className="text-slate-500 text-xs md:text-sm mb-2">
                We'll notify <span className="text-primary-600 font-medium">{email}</span> the moment EkalGo launches.
              </p>
              <p className="text-slate-400 text-[10px] md:text-xs mb-8">
                Check your inbox for a confirmation + exclusive early bird perks.
              </p>
              <button
                onClick={handleClose}
                className="btn-outline w-full"
              >
                Done
              </button>
            </div>
          )}
        </div>
        
        {/* Close Button */}
        <button onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all z-[200]">
          <X size={18} />
        </button>
      </motion.div>
    </div>
  );
}
