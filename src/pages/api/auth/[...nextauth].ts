import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CreadentialsProvider from 'next-auth/providers/credentials';
import { oauthLoginRegister } from '@/repository/auth.repository';

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
        console.log('data', data);
        console.log(`data dari backend ${data}`);
        if (!data.data || !data.token) {
          console.log('Invalid response structure: missing data or token');
          return null;
        }

        return {
          id: data.data.id,
          name: data.data.username,
          email: data.data.email,
          accessToken: data.token,
          number_phone: data.data.number_phone
        } as any;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      console.log('JWT Callback - user (initial):', user);
      console.log('JWT Callback - account:', account);
      if (account) {
        if (account.provider === 'google') {
          try {
            console.log('Google User ID (from NextAuth): ', user.id);
            console.log('Google Provider Account ID (from NextAuth): ', account.providerAccountId);
            const backendUser = await oauthLoginRegister({
              email: user.email!,
              name: user.name!,
              googleId: account.providerAccountId,
            });
            console.log('Backend User (after oauthLoginRegister):', backendUser);
            token.id = backendUser.userId;
            token.accessToken = backendUser.accessToken;
            token.name = backendUser.name;
            token.email = backendUser.email;
            token.number_phone = backendUser.number_phone || "";
          } catch (error) {
            console.error('Error during Google OAuth backend processing:', error);
            // Handle error, maybe redirect to an error page or prevent login
            return Promise.reject(new Error("OAuth login failed"));
          }
        } else if (account.provider === 'credentials' && user) {
          token.id = user.id;
          token.name = user.name;
          token.email = user.email;
          token.accessToken = user.accessToken;
          token.number_phone = user.number_phone;
        }
      }
      return token;
    },
    async session({ session, token, user, profile }: any) {
      if (session) {
        (session.user.userId = token.id),
          (session.user.name = token.name),
          (session.user.email = token.email);
        session.user.accessToken = token.accessToken;
        session.user.number_phone = token.number_phone;
      }
      console.log('Session Callback - session (after update):', session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allow the redirect to the specified URL if it's from the same base URL, otherwise default to homepage
      if (url.startsWith(baseUrl)) return url;
      // Fallback for relative URLs or if callbackUrl is not set (e.g., direct access to /api/auth/signin)
      return baseUrl + '/homepage';
    }
  },
  cookies: {
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
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
