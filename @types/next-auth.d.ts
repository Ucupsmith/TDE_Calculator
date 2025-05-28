// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      userId: number;
      name: string;
      email: string;
    };
  }

  interface User {
    userId: number;
    username: string;
    email: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: number;
    name: string;
    email: string;
  }
}
