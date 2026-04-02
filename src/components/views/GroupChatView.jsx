'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { supabase } from '@/utils/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Hash, Users, Pin, Smile, Paperclip, MoreVertical, Zap } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function GroupChatView({ data }) {
  // Stable Guest Identity for the session
  const user = useMemo(() => {
    if (typeof window === 'undefined') return { id: 'guest', user_metadata: { username: 'Guest' } };
    let guestId = localStorage.getItem('ekalgo_guest_id');
    if (!guestId) {
      guestId = `guest-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('ekalgo_guest_id', guestId);
    }
    return { id: guestId, user_metadata: { username: `Explorer_${guestId.split('-')[1]}` } };
  }, []);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatRef = useRef(null);
  
  const tripId = data?.id || 'global-exploration';
  const tripTitle = data?.title || 'Global Hub';

  useEffect(() => {
    // 1. Fetch initial messages
    const fetchMessages = async () => {
      const { data: initialMessages, error } = await supabase
        .from('messages')
        .select('*')
        .eq('trip_id', tripId)
        .order('created_at', { ascending: true });

      if (initialMessages) setMessages(initialMessages);
    };

    fetchMessages();

    // 2. Subscribe to Realtime Channel
    const channel = supabase.channel(`trip-${tripId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `trip_id=eq.${tripId}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tripId]);

  useEffect(() => {
    if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const messageObj = {
      trip_id: tripId,
      sender_id: user.id,
      text: newMessage,
      type: 'chat',
      sender_name: user.user_metadata?.username || user.email.split('@')[0]
    };

    const { error } = await supabase.from('messages').insert([messageObj]);
    if (!error) setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-[#010912] overflow-hidden">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-between z-10 shrink-0">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold border border-accent-gold/20">
               <Hash size={18} />
            </div>
            <div>
               <h3 className="text-sm font-bold text-white uppercase tracking-widest">{tripTitle}</h3>
               <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest flex items-center gap-2">
                 <Users size={10} /> 14 Active Connectors
               </p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <button className="text-white/40 hover:text-white transition-colors">
               <Pin size={18} />
            </button>
            <button className="text-white/40 hover:text-white transition-colors">
               <MoreVertical size={18} />
            </button>
         </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={chatRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide no-scrollbar"
      >
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20 grayscale">
               <Zap size={48} />
               <p className="text-xs uppercase tracking-[0.3em] font-bold">Initializing Encrypted Stream...</p>
            </div>
          ) : messages.map((msg, idx) => {
            const isMe = msg.sender_id === user?.id;
            return (
              <motion.div
                key={msg.id || idx}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "flex flex-col max-w-[80%]",
                  isMe ? "ml-auto items-end" : "items-start"
                )}
              >
                {!isMe && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent-gold/60 mb-1 ml-1">
                    {msg.sender_name}
                  </span>
                )}
                <div className={cn(
                  "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                  isMe 
                    ? "bg-accent-gold text-brand-900 font-medium shadow-glow-gold rounded-tr-none" 
                    : "bg-white/5 border border-white/5 text-white/80 rounded-tl-none"
                )}>
                  {msg.text}
                </div>
                <span className="text-[8px] font-bold uppercase tracking-widest text-white/20 mt-1.5 px-1">
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-black/40 backdrop-blur-xl border-t border-white/5 shrink-0">
         <form 
           onSubmit={sendMessage}
           className="relative flex items-center gap-3"
         >
            <div className="relative flex-1 group">
               <input 
                 type="text"
                 value={newMessage}
                 onChange={(e) => setNewMessage(e.target.value)}
                 placeholder={`Message in #${tripTitle.toLowerCase().replace(/\s/g, '-')}`}
                 className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-4 pr-12 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent-gold/40 focus:bg-white/[0.07] transition-all"
               />
               <button 
                 type="button" 
                 className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-accent-gold transition-colors"
               >
                  <Smile size={20} />
               </button>
            </div>
            
            <button 
              type="submit"
              disabled={!newMessage.trim()}
              className="w-14 h-14 rounded-2xl bg-accent-gold text-brand-900 flex items-center justify-center shadow-glow-gold hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:scale-100 disabled:shadow-none"
            >
               <Send size={20} />
            </button>
         </form>
         
         <div className="flex items-center gap-6 mt-4 ml-1">
            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white/60 transition-colors">
               <Paperclip size={12} /> Attach File
            </button>
            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white/60 transition-colors">
               <Hash size={12} /> Create Poll
            </button>
         </div>
      </div>
    </div>
  );
}
