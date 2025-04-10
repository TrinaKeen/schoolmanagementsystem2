import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
// You can also use other providers or custom credentials

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // Add other providers here
  ],
  callbacks: {
    async session({ session, user }) {
      // Add user ID to session object
      session.user.id = user.id;
      return session;
    },
  },
  pages: {
    signIn: '/auth/sign-in', // Optional custom sign-in page
  },
};

export default NextAuth(authOptions);
