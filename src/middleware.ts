import { authMiddleware } from '@civic/auth/nextjs/middleware';

export default authMiddleware();

export const config = {
  matcher: [
    /**
     * Match all routes EXCEPT:
     * - _next (Next.js internals)
     * - static files
     * - logout routes
     */
    '/((?!_next|favicon.ico|sitemap.xml|robots.txt|.*\\.jpg|.*\\.png|.*\\.svg|.*\\.gif|api/auth/logout|api/auth/logoutcallback).*)',
  ],
};
