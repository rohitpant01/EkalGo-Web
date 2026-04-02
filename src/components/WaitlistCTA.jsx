import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight, Loader2, CheckCircle, Mail } from 'lucide-react';
import { addToWaitlist } from '../utils/waitlist';

export default function WaitlistCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error | already_joined
  const [errorMsg, setErrorMsg] = useState('');

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
      setEmail('');
    } else if (result.alreadyExists) {
      setStatus('already_joined');
      setEmail('');
    } else {
      setStatus('error');
      setErrorMsg(result.error);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-brand-900 border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-neon/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-accent-gold/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center mb-6"
        >
          <div className="w-16 h-16 rounded-2xl glass-panel border border-accent-gold/30 flex items-center justify-center shadow-glow-gold animate-float">
            <Rocket size={32} className="text-accent-gold" />
          </div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-bold text-white mb-6 drop-shadow-lg"
        >
          Be the first to experience <br className="hidden md:block" />
          <span className="text-gradient-gold">AI Travel.</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-4"
        >
          Join 100+ travelers securing their spot. Get exclusive early access and a special premium badge on launch.
        </motion.p>

        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-400/10 border border-red-400/20 mb-12"
        >
           <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
           <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Only limited early access available</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-md mx-auto relative"
        >
          {status === 'success' || status === 'already_joined' ? (
             <div className="glass-panel p-6 rounded-2xl border border-accent-teal/30 flex flex-col items-center">
                <CheckCircle size={48} className="text-accent-teal mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  {status === 'success' ? "You're on the list! 🎉" : "You're already on the list! 👋"}
                </h3>
                <p className="text-gray-400 text-sm">We'll notify you the moment EkalGo launches.</p>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative z-20">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    disabled={status === 'loading'}
                    className="w-full pl-12 pr-4 py-4 bg-brand-800/80 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold/50 transition-colors backdrop-blur-md"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={status === 'loading' || !email.trim()}
                  className="btn-primary sm:w-auto w-full py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-2 group whitespace-nowrap"
                >
                  {status === 'loading' ? (
                    <><Loader2 size={20} className="animate-spin" /> Processing</>
                  ) : (
                    <>Join Waitlist <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </div>
              {errorMsg && (
                <p className="absolute -bottom-6 left-0 text-sm text-red-400">{errorMsg}</p>
              )}
            </form>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-accent-teal" /> Free early access</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-accent-teal" /> No spam</span>
            <span className="flex items-center gap-1.5 font-bold text-accent-gold"><Mail size={14} /> ekalgo.app@gmail.com</span>
          </div>

          <div className="mt-6 flex justify-center gap-4">
             <a href="https://x.com/ekal_go" target="_blank" rel="noopener noreferrer" className="text-blue-100/30 hover:text-accent-gold transition-colors text-xs font-mono uppercase tracking-widest">Twitter (X)</a>
             <span className="text-white/10">/</span>
             <a href="https://instagram.com/ekalgo.app" target="_blank" rel="noopener noreferrer" className="text-blue-100/30 hover:text-accent-gold transition-colors text-xs font-mono uppercase tracking-widest">Instagram</a>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
