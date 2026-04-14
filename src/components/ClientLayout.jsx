'use client';

import React, { useEffect } from 'react';
import { ModalProvider, useModal } from '@/context/ModalContext';

export default function ClientLayout({ children }) {
  return (
    <ModalProvider>
      {children}
    </ModalProvider>
  );
}
