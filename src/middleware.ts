import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/myApples(.*)',
]);

// Fall back to a no-op middleware if Clerk keys are not available to prevent edge crashes
const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!process.env.CLERK_SECRET_KEY;

export default function middleware(req: Request) {
  if (!hasClerk) {
    return NextResponse.next();
  }
  return (clerkMiddleware((auth, reqInner) => {
    if (isProtectedRoute(reqInner)) {
      auth.protect();
    }
  }) as any)(req as any);
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
