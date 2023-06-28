import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '@/libs/prisma';
import { sha256 } from '@/utils/crypto';

const EMAIL_SERVER: string | undefined = process.env.EMAIL_SERVER;
const EMAIL_FROM: string | undefined = process.env.EMAIL_FROM;
const NEXTATUH_SECRET: string | undefined = process.env.NEXTAUTH_SECRET;

if (!EMAIL_SERVER || !EMAIL_FROM || !NEXTATUH_SECRET) {
  throw new Error('EMAIL_SERVER, EMAIL_FROM, NEXTAUTH_SECRET must be defined');
}

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Sign In',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any, req: any) {
        const email = credentials?.email;
        const password = await sha256(credentials?.password);

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (user && user.password === password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: NEXTATUH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as any).id = token.userId;
      return session;
    },
  },
});
