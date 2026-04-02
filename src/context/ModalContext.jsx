'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import WaitlistModal from '@/components/WaitlistModal';
import LockedModal from '@/components/LockedModal';
import PreviewModal from '@/components/PreviewModal';
import LegalModal from '@/components/LegalModal';

const ModalContext = createContext({
  openWaitlist: () => {},
  closeWaitlist: () => {},
  openLocked: () => {},
  closeLocked: () => {},
  openPreview: () => {},
  closePreview: () => {},
  openLegal: (type) => {},
  closeLegal: () => {},
});

export function ModalProvider({ children }) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistConfig, setWaitlistConfig] = useState({ title: '', description: '' });
  const [lockedOpen, setLockedOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [previewData, setPreviewData] = useState({ isOpen: false, destination: null, itinerary: null });
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalType, setLegalType] = useState('terms');

  const openWaitlist = useCallback((config = {}) => {
    setWaitlistConfig({
      title: config.title || 'Join the Waitlist',
      description: config.description || 'Be the first to know when EkalGo launches. Get exclusive early access + special features.'
    });
    setWaitlistOpen(true);
  }, []);

  const closeWaitlist = useCallback(() => {
    setWaitlistOpen(false);
    setWaitlistConfig({ title: '', description: '' });
  }, []);

  const openLocked = useCallback(() => setLockedOpen(true), []);
  const closeLocked = useCallback(() => setLockedOpen(false), []);
  const openAuth = useCallback(() => setAuthOpen(true), []);

  const openPreview = useCallback((data) => {
    setPreviewData({ isOpen: true, destination: data.destination, itinerary: data.itinerary });
  }, []);

  const closePreview = useCallback(() => {
    setPreviewData(prev => ({ ...prev, isOpen: false }));
  }, []);

  const openLegal = useCallback((type) => {
    setLegalType(type);
    setLegalOpen(true);
  }, []);

  const closeLegal = useCallback(() => setLegalOpen(false), []);

  const handleLockedToWaitlist = useCallback(() => {
    setLockedOpen(false);
    setWaitlistOpen(true);
  }, []);

  return (
    <ModalContext.Provider value={{ 
      openWaitlist, closeWaitlist, 
      openLocked, closeLocked, 
      openPreview, closePreview,
      openLegal, closeLegal
    }}>
      {children}
      
      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={closeWaitlist}
      />
      
      <LockedModal
        isOpen={lockedOpen}
        onClose={closeLocked}
        onWaitlistOpen={handleLockedToWaitlist}
      />

      <PreviewModal
        isOpen={previewData.isOpen}
        onClose={closePreview}
        destination={previewData.destination}
        itinerary={previewData.itinerary}
      />

      <LegalModal
        isOpen={legalOpen}
        onClose={closeLegal}
        type={legalType}
      />
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
