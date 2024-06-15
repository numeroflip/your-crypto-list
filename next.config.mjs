import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
          fullUrl: true,

        },
      },
      experimental: {
        swcPlugins: [
          ['@swc-jotai/debug-label', { atomNames: ['customAtom'] }],
        ],
      },
};

export default nextConfig;
