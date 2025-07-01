import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE === 'true';

  if (isMaintenanceMode) {
    return NextResponse.redirect(new URL('/maintain', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!maintain|mock|api|_next|_vercel|.*\\..*).*)'],
};
