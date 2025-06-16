import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const middleware = async (req: NextRequest) => {
  const accessToken = req.cookies.get('accessToken');
  const loginUrl = '/auth/login';
  const userRole = 'user';
  const { url, headers } = req;
  if (!accessToken) {
    return NextResponse.redirect(new URL(loginUrl, url));
  }
  const requestHeaders = new Headers(headers);
  requestHeaders.set('x-user-role', userRole);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
  response.headers.set('x-middleware-custom', 'value');

  return response;
};

export const config = {
  matcher: [
    // "/((?!api|_next/static|_next/image|favicon.ico|auth/login|auth/register|auth/forgot-password|auth/reset-password|auth/email-sent|auth/verify-email).*)",
  ]
};

export default middleware;
