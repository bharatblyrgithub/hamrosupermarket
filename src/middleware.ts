import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isAuthRoute = request.nextUrl.pathname.startsWith('/account');
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/admin');

  // Protect admin routes
  if ((isAdminRoute || isApiRoute) && (!token || token.role !== 'ADMIN')) {
    // Redirect to login page if not authenticated
    if (!token) {
      return NextResponse.redirect(
        new URL(`/account?redirect=${encodeURIComponent(request.nextUrl.pathname)}`, request.url)
      );
    }
    // Return 403 if authenticated but not admin
    return new NextResponse(
      JSON.stringify({ error: 'Access denied' }),
      { status: 403, headers: { 'content-type': 'application/json' } }
    );
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && token) {
    // If there's a redirect parameter, use it
    const redirectParam = request.nextUrl.searchParams.get('redirect');
    if (redirectParam) {
      return NextResponse.redirect(new URL(redirectParam, request.url));
    }
    // Otherwise, redirect to home page
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    // Admin routes
    '/admin/:path*',
    // API routes
    '/api/admin/:path*',
    // Auth routes
    '/account',
    '/account/:path*'
  ]
};
