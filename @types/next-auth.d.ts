// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      userId: number;
      username: string;
      name: string;
      email: string;
      accessToken: string;
    };
  }

  interface User {
    userId: number;
    username: string;
    name: string;
    email: string;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: number;
    username: string;
    name: string;
    email: string;
    accessToken: string;
  }
}
