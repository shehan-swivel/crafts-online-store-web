import { authService } from "@/services";
import { Login } from "@/types";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const response = await authService.login(credentials as Login);

        const user = response.data.data;

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      // const response = await authService.getCurrentUser();
      // session.user = response.data.data;

      session.user = token as any;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
