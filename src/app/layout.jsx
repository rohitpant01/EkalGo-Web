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
  title: {
    default: "EkalGo — AI-Powered Travel Platform | Plan Your Perfect Trip",
    template: "%s | EkalGo Travel"
  },
  description: "Plan smart, budget-friendly trips with EkalGo. Discover hidden gems, find verified travel partners, and get AI-optimized itineraries for Manali, Goa, and beyond.",
  keywords: [
    "AI Travel Planner", "Plan Trip to Manali", "Budget Travel India", 
    "Find Travel Partners", "Hidden Gems Himachal", "Smart Itinerary Generator",
    "Solo Travel India", "EkalGo App", "Personalized Travel Recommendations"
  ],
  authors: [{ name: "EkalGo Team" }],
  creator: "EkalGo",
  publisher: "EkalGo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "EkalGo — AI-Powered Travel Planning for the Modern Explorer",
    description: "Discover hidden gems, find verified travel partners, and plan your next adventure with our AI-powered travel assistant.",
    url: "https://ekalgo.com",
    siteName: "EkalGo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EkalGo AI Travel Platform - Plan Smart, Travel More",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EkalGo — Your AI Travel Assistant",
    description: "Plan budget-friendly trips and find travel partners instantly. The future of travel is here.",
    site: "@ekal_go",
    creator: "@ekal_go",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "EkalGo",
  "operatingSystem": "iOS, Android, Web",
  "applicationCategory": "TravelApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "300"
  },
  "description": "AI-powered travel platform for discovering hidden gems, finding verified travel partners, and creating optimized budget-friendly itineraries.",
  "url": "https://ekalgo.com",
  "logo": "https://ekalgo.com/logo.png",
  "sameAs": [
    "https://x.com/ekal_go",
    "https://instagram.com/ekalgo.app"
  ]
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
