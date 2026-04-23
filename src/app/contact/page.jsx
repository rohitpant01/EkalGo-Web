'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send, Phone, ArrowRight, CheckCircle, AtSign } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const { openWaitlist } = useModal();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error('Failed to send email:', error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const CONTACT_INFO = [
    {
      icon: AtSign,
      title: 'Email Us',
      desc: 'ekalgo.app@gmail.com',
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=ekalgo.app@gmail.com',
      color: 'bg-primary-50 text-primary-500',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      desc: '+91 84749 72007',
      href: 'https://wa.me/918474972007',
      color: 'bg-emerald-50 text-emerald-500',
    },
    {
      icon: MapPin,
      title: 'Location',
      desc: 'India',
      href: null,
      color: 'bg-accent-50 text-accent-600',
    },
  ];

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-surface-alt to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary-100/30 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container-tight relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4"
          >
            Get in <span className="text-gradient-primary">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-slate-500 max-w-lg mx-auto"
          >
            Have questions, feedback, or just want to say hello? We&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900 mb-2">Contact Information</h2>
                <p className="text-sm text-slate-500">Reach out through any of these channels.</p>
              </div>

              <div className="space-y-4">
                {CONTACT_INFO.map((info, idx) => {
                  const Icon = info.icon;
                  const Wrapper = info.href ? 'a' : 'div';
                  const wrapperProps = info.href ? { href: info.href, target: info.href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' } : {};
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 + 0.2 }}
                    >
                      <Wrapper
                        {...wrapperProps}
                        className="card flex items-center gap-4 group"
                      >
                        <div className={`icon-box icon-box-md rounded-xl ${info.color} flex-shrink-0`}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">{info.title}</p>
                          <p className="text-base font-medium text-slate-800 group-hover:text-primary-600 transition-colors">{info.desc}</p>
                        </div>
                      </Wrapper>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social links */}
              <div className="pt-4">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="https://x.com/ekal_go" target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all">
                    Twitter (X)
                  </a>
                  <a href="https://instagram.com/ekalgo.app" target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all">
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card text-center py-16"
                >
                  <div className="icon-box icon-box-lg rounded-full bg-primary-50 text-primary-500 mx-auto mb-4">
                    <CheckCircle size={28} />
                  </div>
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 mb-6">We&apos;ll get back to you as soon as possible.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }} className="btn-outline">
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onSubmit={handleSubmit}
                  className="card space-y-5 p-6 md:p-8"
                >
                  <h2 className="text-xl font-display font-bold text-slate-900 mb-1">Send a Message</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary w-full sm:w-auto"
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 md:py-16 bg-surface-alt border-t border-slate-100">
        <div className="container-tight text-center">
          <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900 mb-3">
            Want early access instead?
          </h2>
          <p className="text-slate-500 mb-6 text-sm">Join our waitlist and be the first to try EkalGo.</p>
          <button onClick={() => openWaitlist()} className="btn-accent">
            Join the Waitlist
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
