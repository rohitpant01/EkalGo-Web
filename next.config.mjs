/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'react-map-gl', 
    'mapbox-gl', 
    '@deck.gl/react', 
    '@deck.gl/layers', 
    '@deck.gl/aggregation-layers'
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'images.pixabay.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'maps.googleapis.com' },
      { protocol: 'https', hostname: 'pixabay.com' },
    ],
  },
};

export default nextConfig;
