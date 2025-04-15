import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
// You can also use other providers or custom credentials

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && user.password === credentials.password) {
          return user;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async session({ session, token, user }) {
      // Add user ID to session object
      session.user.role = token.role;
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // attach role from db to token
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/sign-in", // Optional custom sign-in page
  },
};

export default NextAuth(authOptions);
