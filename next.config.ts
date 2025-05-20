import type {NextConfig} from 'next';
// @ts-ignore next-pwa is not typed for ES modules
import withPWAInit from 'next-pwa';

const runtimeCaching = [
  {
    urlPattern: /^https?.*/, 
    handler: 'NetworkFirst', 
    options: {
      cacheName: 'offlineCache',
      expiration: {
        maxEntries: 200,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },
];

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,  
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = {
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'placehold.co', port: '', pathname: '/**' },
    ],
  },
};

export default withPWA(nextConfig);
