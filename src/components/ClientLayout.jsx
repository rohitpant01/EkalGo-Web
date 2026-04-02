'use client';

import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { ModalProvider } from '@/context/ModalContext';

export default function ClientLayout({ children }) {
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
    <ModalProvider>
      {children}
    </ModalProvider>
  );
}
