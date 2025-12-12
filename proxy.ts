import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE === 'true';

  if (isMaintenanceMode) {
    return NextResponse.redirect(new URL('/maintain', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!maintain|mock|api|_next|_vercel|.*\\..*).*)'],
};
