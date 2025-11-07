
import type {NextConfig} from 'next';
// @ts-ignore next-pwa is not typed for ES modules
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  cacheOnNavigation: true, // Added to cache pages during client-side navigation
  disable: process.env.NODE_ENV === 'development',
  
  // You can add more PWA configurations here, like runtime caching strategies
});

const nextConfig: NextConfig = {
  /* config options here */
  swcMinify: true, // Enable SWC minification
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default withPWA(nextConfig);
