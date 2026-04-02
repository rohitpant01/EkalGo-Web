import React from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaitlistModal from '@/components/WaitlistModal';
import LockedModal from '@/components/LockedModal';
import LiveSocialProof from '@/components/LiveSocialProof';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Toaster } from 'react-hot-toast';
import ClientLayout from '@/components/ClientLayout';

export const metadata = {
  title: 'EkalGo — Travel Together, Explore Freely',
  description: 'EkalGo is an AI-powered travel assistant that helps you discover hidden gems and create personalized itineraries.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen noise-bg w-full overflow-x-hidden relative" style={{ background: 'var(--brand-900)' }}>
        <ClientLayout>
          <Toaster position="top-right" />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <LiveSocialProof />
          <WhatsAppButton />
        </ClientLayout>
      </body>
    </html>
  );
}
