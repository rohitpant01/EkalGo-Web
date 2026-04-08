'use client';

import React, { useEffect } from 'react';
import { ModalProvider, useModal } from '@/context/ModalContext';

function AutoPopupTrigger() {
  const { openDownloadApp } = useModal();

  useEffect(() => {
    // Check if the popup has been shown in this session
    const hasShown = sessionStorage.getItem('ekalgo_app_launch_popup');
    
    if (!hasShown) {
      // Delay slightly for better UX (after other animations)
      const timer = setTimeout(() => {
        openDownloadApp();
        sessionStorage.setItem('ekalgo_app_launch_popup', 'true');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [openDownloadApp]);

  return null;
}

export default function ClientLayout({ children }) {
  return (
    <ModalProvider>
      <AutoPopupTrigger />
      {children}
    </ModalProvider>
  );
}
