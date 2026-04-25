import React from 'react';

export const metadata = {
  title: "Explore Destinations — AI-Powered Travel Discovery Hub",
  description: "Browse curated travel routes, hidden gems, and budget-friendly destinations across India. Use our AI discovery engine to find your next perfect trip.",
  keywords: ["Travel Destinations India", "AI Travel Routes", "Hidden Gems Discovery", "Budget Travel Planning", "India Travel Guide 2026"],
  alternates: {
    canonical: 'https://ekalgo.com/explore',
  },
  openGraph: {
    title: "Explore India's Hidden Gems with EkalGo AI",
    description: "Discover curated travel routes and plan your perfect adventure with our AI-powered discovery engine.",
    images: ['/og-image.png'],
  }
};

export default function ExploreLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}
