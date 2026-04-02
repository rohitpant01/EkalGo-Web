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
  metadataBase: new URL('https://ekalgo.com'),
  title: "EkalGo — Discover Legendary Routes & Hidden Gems",
  description: "EkalGo is an AI-powered travel assistant that creates personalized itineraries and finds off-beat destinations for the modern explorer.",
  keywords: ["nearby places", "travel itineraries", "AI travel planner", "hidden gems India", "solo travel"],
  openGraph: {
    title: "EkalGo — Discover Legendary Routes & Hidden Gems",
    description: "AI-powered travel itineraries and hidden gem discovery. Planning smarter, exploring deeper.",
    url: "https://ekalgo.com",
    siteName: "EkalGo",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "EkalGo AI Travel Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EkalGo — Discover Legendary Routes & Hidden Gems",
    description: "AI-powered itineraries and hidden gems. Your personal travel architect.",
    creator: "@ekal_go",
    images: ["/logo.png"],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "EkalGo",
  "alternateName": "EkalGo AI",
  "url": "https://ekalgo.com",
  "logo": "https://ekalgo.com/logo.png",
  "description": "AI-powered travel platform for discovering hidden gems and creating optimized itineraries.",
  "sameAs": [
    "https://x.com/ekal_go",
    "https://instagram.com/ekalgo.app"
  ],
  "areaServed": "India",
  "priceRange": "$$"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen noise-bg w-full overflow-x-hidden relative" style={{ background: 'var(--brand-900)' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClientLayout>
          <Toaster position="top-right" />
          <Navbar />
          <main className="pt-20 pb-32 sm:pb-40 min-h-screen">
            {children}
          </main>
          <Footer />
          <LiveSocialProof />
          <WhatsAppButton />
        </ClientLayout>
      </body>
    </html>
  );
}
