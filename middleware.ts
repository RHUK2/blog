import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export const config = {
  matcher: ['/', '/markdown', '/markdown/:folderName/detail', '/gpt'],
};

export function middleware(req: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE === 'true';
  console.log('🚀 ~ middleware ~ isMaintenanceMode:', isMaintenanceMode);

  if (isMaintenanceMode) {
    return NextResponse.redirect(new URL('/maintain', req.url));
  }

  return NextResponse.next();
}
