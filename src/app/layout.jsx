import React from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaitlistModal from '@/components/WaitlistModal';
import LockedModal from '@/components/LockedModal';
import { Toaster } from 'react-hot-toast';
import ClientLayout from '@/components/ClientLayout';

export const metadata = {
  metadataBase: new URL('https://ekalgo.com'),
  title: "EkalGo — AI-Powered Travel Platform | Discover Hidden Gems",
  description: "EkalGo is an AI-powered travel platform that creates personalized itineraries and discovers off-beat destinations for the modern explorer.",
  keywords: ["nearby places", "travel itineraries", "AI travel planner", "hidden gems India", "solo travel", "travel companion"],
  openGraph: {
    title: "EkalGo — AI-Powered Travel Platform",
    description: "Smart itineraries, hidden gems, and travel companions — all powered by AI.",
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
    title: "EkalGo — AI-Powered Travel Platform",
    description: "Smart itineraries, hidden gems, and travel companions — all powered by AI.",
    creator: "@ekal_go",
    images: ["/logo.png"],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen w-full overflow-x-hidden bg-white text-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClientLayout>
          <Toaster 
            position="top-center" 
            toastOptions={{
              style: {
                background: '#FFFFFF',
                color: '#0F172A',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                fontSize: '14px',
              },
            }}
          />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
