import { getToken } from 'next-auth/jwt';
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse
} from 'next/server';

export const withAuth = (
  middleware: NextMiddleware,
  requiereAuth: string[] = []
) => {
  //   return async (req: NextRequest, next: NextFetchEvent) => {
  //     const pathname = req.nextUrl.pathname;
  //     if (requiereAuth.includes(pathname)) {
  //       const token = await getToken({
  //         req,
  //         secret: process.env.AUTH_SECRET
  //       });
  //       if (!token) {
  //         const url = new URL('/homepage', req.url);
  //         return NextResponse.redirect(url);
  //       }
  //     }
  //     return middleware(req, next);
  //   };
};
