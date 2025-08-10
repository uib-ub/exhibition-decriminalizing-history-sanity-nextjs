import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://cdn.sanity.io/**'),
      new URL('https://data.ub.uib.no/**'),
    ],
  },
};

export default withNextIntl(nextConfig);
