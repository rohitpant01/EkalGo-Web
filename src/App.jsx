import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WaitlistModal from './components/WaitlistModal';
import LockedModal from './components/LockedModal';

import Home from './pages/Home';
import Safety from './pages/Safety';
import Pricing from './pages/Pricing';
import RoutesPage from './pages/Routes';

import { useItinerary } from './hooks/useItinerary';
import { notify } from './utils/toast';
import LiveSocialProof from './components/LiveSocialProof';

export default function App() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [lockedOpen, setLockedOpen] = useState(false);

  const { itinerary, loading, error, query, enriching, search, reset } = useItinerary();

  const handleSearch = (q) => {
    search(q);
    // Scroll to results area after a tick
    setTimeout(() => {
      const el = document.getElementById('itinerary');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  const handleShare = () => {
    if (navigator.share && itinerary) {
      navigator.share({
        title: itinerary.title,
        text: `Check out this EkalGo itinerary: ${itinerary.title}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      notify.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen noise-bg" style={{ background: 'var(--ocean-900)' }}>
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
              itinerary={itinerary}
              loading={loading}
              error={error}
              query={query}
              enriching={enriching}
              onSearch={handleSearch}
              onWaitlistOpen={() => setWaitlistOpen(true)}
              onLockedOpen={() => setLockedOpen(true)}
              onShare={handleShare}
              onRetry={() => search(query)}
            />
          } 
        />
        <Route path="/safety" element={<Safety />} />
        <Route path="/pricing" element={<Pricing onWaitlistOpen={() => setWaitlistOpen(true)} />} />
        <Route path="/routes" element={<RoutesPage />} />
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
    </div>
  );
}
