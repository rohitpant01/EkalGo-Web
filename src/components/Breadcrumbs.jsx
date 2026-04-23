import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items }) {
  // JSON-LD for BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://ekalgo.com${item.href}`
    }))
  };

  return (
    <nav className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-slate-400 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap py-2" aria-label="Breadcrumb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <Link href="/" className="hover:text-primary-500 transition-colors flex items-center gap-1.5 shrink-0">
        <Home size={12} />
        Home
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={10} className="shrink-0 opacity-20" />
          {index === items.length - 1 ? (
            <span className="text-primary-500 font-bold truncate max-w-[150px] sm:max-w-none">
              {item.label}
            </span>
          ) : (
            <Link href={item.href} className="hover:text-primary-500 transition-colors truncate max-w-[100px] sm:max-w-none">
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
