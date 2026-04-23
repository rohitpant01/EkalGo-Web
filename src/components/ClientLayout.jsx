'use client';

import { ModalProvider } from '@/context/ModalContext';

export default function ClientLayout({ children }) {
  return (
    <ModalProvider>
      {children}
    </ModalProvider>
  );
}
