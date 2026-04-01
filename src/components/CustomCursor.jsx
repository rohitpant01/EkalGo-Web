import React, { useEffect, useState, useRef } from 'react';
import { Navigation, Compass, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [rotation, setRotation] = useState(0);
  const lastX = useRef(0);

  useEffect(() => {
    // Only visible on fine pointer devices (desktops)
    if (window.matchMedia('(pointer: coarse)').matches) {
      setHidden(true);
      return;
    }

    const addEventListeners = () => {
      document.addEventListener('mousemove', mMove);
      document.body.addEventListener('mouseenter', mEnter);
      document.body.addEventListener('mouseleave', mLeave);
      document.addEventListener('mousedown', mDown);
      document.addEventListener('mouseup', mUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', mMove);
      document.body.removeEventListener('mouseenter', mEnter);
      document.body.removeEventListener('mouseleave', mLeave);
      document.removeEventListener('mousedown', mDown);
      document.removeEventListener('mouseup', mUp);
    };

    const mMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Calculate rotation based on horizontal movement
      const deltaX = e.clientX - lastX.current;
      setRotation(deltaX * 0.5);
      lastX.current = e.clientX;
    };

    const mEnter = () => setHidden(false);
    const mLeave = () => setHidden(true);
    const mDown = () => setClicked(true);
    const mUp = () => setClicked(false);

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, [role="button"], input, select, textarea, .cursor-pointer').forEach((el) => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    addEventListeners();
    handleLinkHoverEvents();

    // Re-check DOM for dynamically added elements
    const observer = new MutationObserver((mutations) => {
      handleLinkHoverEvents();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      removeEventListeners();
      observer.disconnect();
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Outer Glow */}
      <motion.div
        animate={{ 
          x: position.x - 20, 
          y: position.y - 20,
          scale: linkHovered ? 2.5 : (clicked ? 0.8 : 1),
          opacity: linkHovered ? 0.3 : 0.1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.5 }}
        className="fixed top-0 left-0 w-10 h-10 bg-accent-gold rounded-full blur-xl pointer-events-none z-[9998]"
      />

      {/* Main Cursor Icon */}
      <motion.div
        animate={{ 
          x: position.x - 12, 
          y: position.y - 12,
          rotate: rotation,
          scale: linkHovered ? 1.5 : (clicked ? 0.9 : 1),
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 500, mass: 0.2 }}
        className={`fixed top-0 left-0 z-[9999] pointer-events-none ${linkHovered ? 'text-accent-gold' : 'text-accent-gold/80'}`}
      >
        {linkHovered ? <Compass size={24} className="animate-spin-slow" /> : <Navigation size={24} fill="currentColor" />}
      </motion.div>
      
      {/* Click Pulse */}
      {clicked && (
        <motion.div
          initial={{ x: position.x - 12, y: position.y - 12, scale: 0.5, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          className="fixed top-0 left-0 w-6 h-6 border-2 border-accent-gold rounded-full pointer-events-none z-[9997]"
        />
      )}
    </>
  );
}
