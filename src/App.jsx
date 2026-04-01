import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WaitlistModal from './components/WaitlistModal';
import LockedModal from './components/LockedModal';

import Home from './pages/Home';
import Safety from './pages/Safety';
import Pricing from './pages/Pricing';
import Explore from './pages/Explore';
import AIPlanner from './pages/AIPlanner';
import Privacy from './pages/Privacy';
import Security from './pages/Security';

import LiveSocialProof from './components/LiveSocialProof';
import WhatsAppButton from './components/WhatsAppButton';
import Lenis from '@studio-freight/lenis';

export default function App() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [lockedOpen, setLockedOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      wheelMultiplier: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen noise-bg w-full overflow-hidden relative" style={{ background: 'var(--brand-900)' }}>
      
      {/* Toast */}
      <Toaster position="top-right" />

      {/* Navbar */}
      <Navbar onWaitlistOpen={() => setWaitlistOpen(true)} />

      {/* Routes Configuration */}
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              onWaitlistOpen={() => setWaitlistOpen(true)}
              onLockedOpen={() => setLockedOpen(true)}
            />
          } 
        />
        <Route path="/safety" element={<Safety />} />
        <Route path="/pricing" element={<Pricing onWaitlistOpen={() => setWaitlistOpen(true)} />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/ai-planner" element={<AIPlanner />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/security" element={<Security />} />
      </Routes>

      {/* Shared Components */}
      <Footer onWaitlistOpen={() => setWaitlistOpen(true)} />

      {/* Modals */}
      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
      />
      <LockedModal
        isOpen={lockedOpen}
        onClose={() => setLockedOpen(false)}
        onWaitlistOpen={() => {
          setLockedOpen(false);
          setWaitlistOpen(true);
        }}
      />
      
      {/* Live Social Notifications */}
      <LiveSocialProof />

      {/* Floating Support */}
      <WhatsAppButton />
    </div>
  );
}
