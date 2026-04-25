import React from 'react';

/**
 * BreadcrumbSchema Component
 * @param {Array} items - List of items { label, href }
 */
export function BreadcrumbSchema({ items }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href.startsWith('http') ? item.href : `https://ekalgo.com${item.href}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQSchema Component
 * @param {Array} faqs - List of FAQs { q, a }
 */
export function FAQSchema({ faqs }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * DestinationSchema Component
 * @param {Object} data - Destination data
 */
export function DestinationSchema({ data }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": data.name,
    "description": data.desc || data.tagline,
    "image": data.image,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.name,
      "addressRegion": data.state,
      "addressCountry": "IN"
    },
    "touristType": data.tags || ["Travel"],
    "hasMap": `https://www.google.com/maps/search/${encodeURIComponent(data.name)}`
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
