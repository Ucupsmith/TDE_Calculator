import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CreadentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  secret: process.env.AUTH_SECRET ?? 'tdee.calculations',
  providers: [
    GoogleProvider({
      name: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CreadentialsProvider({
      name: 'credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Missing email or password');
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/v1/users/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          }
        );
        const data = await response.json();
        console.log(`data dari backend ${data}`);
        if (!data.ok) {
          console.log(data.message || 'Invalid credentials');
        }
        if (!data.data || !data.token) {
          console.log('Invalid response structure');
        }
        return {
          id: data.data.id,
          name: data.data.username,
          email: data.data.email,
          token: data.token
        } as any;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        (token.userId = parseInt(user.id)),
          (token.username = user.name),
          (token.email = user.email);
        if (account?.provider === 'credentials' && (user as any).token) {
             token.accessToken = (user as any).token;
        }
      }
      return token;
    },
    async session({ session, token, user, profile }: any) {
      if (session) {
        (session.user.userId = token.userId),
          (session.user.username = token.username),
          (session.user.email = token.email);
        session.accessToken = token.accessToken
      }
      return session;
    }
  },
  cookies: {
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/homepage',
        secure: true
      }
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login'
  }
};

export default NextAuth(authOptions);
