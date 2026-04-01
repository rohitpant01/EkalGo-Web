import React, { useState } from 'react';
import { X, Mail, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { addToWaitlist } from '../utils/waitlist';

export default function WaitlistModal({ isOpen, onClose }) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop overflow-y-auto"
      data-lenis-prevent
      style={{ background: 'rgba(1,13,22,0.95)', backdropFilter: 'blur(16px)' }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}>

      <div className="relative w-full max-w-md rounded-3xl overflow-hidden animate-slide-up"
        style={{ background: 'linear-gradient(160deg, #043358 0%, #021A2C 100%)', border: '1px solid rgba(45,212,191,0.2)' }}>

        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #2DD4BF, transparent 70%)' }} />

        <button onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-blue-200/40 hover:text-white hover:bg-white/10 transition-all z-10">
          <X size={18} />
        </button>

        <div className="relative p-8">
          {status !== 'success' && status !== 'already_joined' ? (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(45,212,191,0.12)', border: '1px solid rgba(45,212,191,0.2)' }}>
                  <Mail size={24} className="text-teal-400" />
                </div>
                <h2 className="font-display text-2xl font-bold text-white mb-2">
                  Join the Waitlist
                </h2>
                <p className="text-blue-200/50 text-sm">
                  Be the first to know when EkalGo launches. Get exclusive early access + special features.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Mail size={16} className="text-blue-300/40 flex-shrink-0" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      disabled={status === 'loading'}
                      className="flex-1 bg-transparent text-white placeholder-blue-200/25 text-sm outline-none"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-xs text-ember px-1">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading' || !email.trim()}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-ocean-900 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #F9A826 0%, #F59E0B 100%)' }}>
                  {status === 'loading' ? (
                    <><Loader2 size={18} className="animate-spin" /> Joining...</>
                  ) : (
                    <><span>Join Waitlist</span><ArrowRight size={16} /></>
                  )}
                </button>
              </form>

              <div className="mt-6 flex items-center gap-6 justify-center">
                {['🎁 Free early access', '🔕 No spam, ever', '🚀 Launch updates'].map((item) => (
                  <span key={item} className="text-xs text-blue-200/30">{item}</span>
                ))}
              </div>
            </>
          ) : (
            // Success / Already Joined state
            <div className="text-center py-6">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(46,204,113,0.12)', border: '2px solid rgba(46,204,113,0.3)' }}>
                  <CheckCircle size={36} className="text-jade" />
                </div>
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-3">
                {status === 'success' ? "You're on the list! 🎉" : "You're already on the list! 👋"}
              </h2>
              <p className="text-blue-200/50 text-sm mb-2">
                We'll notify <span className="text-teal-300">{email}</span> the moment EkalGo launches.
              </p>
              <p className="text-blue-200/30 text-xs mb-8">
                Check your inbox for a confirmation + exclusive early bird perks.
              </p>
              <button
                onClick={handleClose}
                className="px-8 py-3 rounded-2xl font-semibold text-sm text-white transition-all hover:bg-white/10"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
