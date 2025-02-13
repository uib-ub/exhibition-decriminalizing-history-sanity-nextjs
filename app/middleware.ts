import createMiddleware from 'next-intl/middleware';
import { routing } from '../i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match the root path
    '/',
    // Match all paths that start with a locale
    '/(en|no|es)/:path*',
    // Match all pathnames except for
    // - API routes
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - /favicon.ico, etc.
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ]
};