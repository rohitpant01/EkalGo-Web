'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import WaitlistModal from '@/components/WaitlistModal';
import LockedModal from '@/components/LockedModal';
import PreviewModal from '@/components/PreviewModal';
import LegalModal from '@/components/LegalModal';
import ShareModal from '@/components/ShareModal';
import DownloadAppModal from '@/components/DownloadAppModal';

const ModalContext = createContext({
  openWaitlist: () => {},
  closeWaitlist: () => {},
  openLocked: () => {},
  closeLocked: () => {},
  openPreview: () => {},
  closePreview: () => {},
  openLegal: (type) => {},
  closeLegal: () => {},
  openShare: (data) => {},
  closeShare: () => {},
  openDownloadApp: () => {},
  closeDownloadApp: () => {},
});

export function ModalProvider({ children }) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistConfig, setWaitlistConfig] = useState({ title: '', description: '' });
  const [lockedOpen, setLockedOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [previewData, setPreviewData] = useState({ isOpen: false, destination: null, itinerary: null });
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalType, setLegalType] = useState('terms');
  const [shareData, setShareData] = useState({ isOpen: false, title: '', text: '', url: '' });
  const [downloadAppOpen, setDownloadAppOpen] = useState(false);

  const openWaitlist = useCallback((config = {}) => {
    setWaitlistOpen(true);
    if (config.title) setWaitlistConfig(prev => ({ ...prev, title: config.title }));
    if (config.description) setWaitlistConfig(prev => ({ ...prev, description: config.description }));
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

  const openShare = useCallback((data) => {
    // If Web Share API is available, use it immediately
    if (navigator.share) {
      navigator.share({
        title: data.title,
        text: data.text,
        url: data.url
      }).catch(err => {
        console.error('Sharing failed:', err);
        // Fallback to modal if user cancels or it fails
        setShareData({ isOpen: true, ...data });
      });
    } else {
      setShareData({ isOpen: true, ...data });
    }
  }, []);

  const closeShare = useCallback(() => {
    setShareData(prev => ({ ...prev, isOpen: false }));
  }, []);

  const openDownloadApp = useCallback(() => setDownloadAppOpen(true), []);
  const closeDownloadApp = useCallback(() => setDownloadAppOpen(false), []);

  const handleLockedToWaitlist = useCallback(() => {
    setLockedOpen(false);
    setWaitlistOpen(true);
  }, []);

  return (
    <ModalContext.Provider value={{ 
      openWaitlist, closeWaitlist, 
      openLocked, closeLocked, 
      openPreview, closePreview,
      openLegal, closeLegal,
      openShare, closeShare,
      openDownloadApp, closeDownloadApp
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

      <ShareModal
        isOpen={shareData.isOpen}
        onClose={closeShare}
        data={shareData}
      />

      <DownloadAppModal 
        isOpen={downloadAppOpen}
        onClose={closeDownloadApp}
      />
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
