export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/static/',
          '/waitlist/',
          '/locked/'
        ],
      },
    ],
    sitemap: 'https://ekalgo.com/sitemap.xml',
  };
}
