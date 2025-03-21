import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDb } from "./db";
import User from "@/models/User";
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Name" },
        number: { label: "Number", type: "number", placeholder: "Number" },
        balance: { label: "Balance", type: "number", placeholder: "Balance" },
        password: { label: "Password", type: "password", placeholder: "Password" },
        admin: { label: "Role", type: "boolean", placeholder: "admin" }
      },
      async authorize(credentials) {
        if (!credentials?.number || !credentials?.password) {
          throw new Error("Number and Password are required");
        }

        try {
          await connectToDb();
          const user = await User.findOne({ number: credentials.number });
          if (!user) {
            throw new Error("User Not Found");
          }
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error("Wrong Password");
          }

          return {
            id: user._id.toString(),
            number: user.number,
            balance: user.balance,
            name: user.name,
            admin: user.admin, // Added admin field here
          };
        } catch (error) {
          throw new Error("Database Error" + error);
        }
      }
    })
  ],

  // Callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.number = user.number;  // Adding number
        token.balance = user.balance;  // Adding balance
        token.admin = user.admin;  // Adding admin role to the token
      }
      return token;
    },

    // Session callback
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.number = token.number as number; // Ensure correct type
        session.user.balance = token.balance as number;
        session.user.admin = token.admin as boolean;  // Add admin to session
      }
      return session;
    }
  },

  pages: {
    signIn: "/login",
    error: "/auth/login"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60  // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET
};
