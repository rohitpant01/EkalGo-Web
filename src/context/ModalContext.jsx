'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import WaitlistModal from '@/components/WaitlistModal';
import LockedModal from '@/components/LockedModal';
import PreviewModal from '@/components/PreviewModal';

const ModalContext = createContext({
  openWaitlist: () => {},
  closeWaitlist: () => {},
  openLocked: () => {},
  closeLocked: () => {},
  openPreview: () => {},
  closePreview: () => {},
});

export function ModalProvider({ children }) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [lockedOpen, setLockedOpen] = useState(false);
  const [previewData, setPreviewData] = useState({ isOpen: false, destination: null, itinerary: null });

  const openWaitlist = useCallback(() => setWaitlistOpen(true), []);
  const closeWaitlist = useCallback(() => setWaitlistOpen(false), []);
  const openLocked = useCallback(() => setLockedOpen(true), []);
  const closeLocked = useCallback(() => setLockedOpen(false), []);

  const openPreview = useCallback((data) => {
    setPreviewData({ isOpen: true, destination: data.destination, itinerary: data.itinerary });
  }, []);

  const closePreview = useCallback(() => {
    setPreviewData(prev => ({ ...prev, isOpen: false }));
  }, []);

  const handleLockedToWaitlist = useCallback(() => {
    setLockedOpen(false);
    setWaitlistOpen(true);
  }, []);

  return (
    <ModalContext.Provider value={{ 
      openWaitlist, closeWaitlist, 
      openLocked, closeLocked, 
      openPreview, closePreview 
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
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
