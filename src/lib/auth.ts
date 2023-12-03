import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // console.log(credentials?.email);
        // console.log(credentials?.password);

        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        // console.log({ existingUser });

    
        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
          return null;
        }

       
        return {
          id: existingUser?.id,
          email: existingUser?.email,
          password: existingUser?.password,
          image: existingUser?.image,
          name: existingUser?.name,
          role: existingUser?.role,
        };
      },
    }),

    
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID!,
    //   clientSecret: process.env.GOOGLE_ID!,
    //   profile(profile) {
    //     console.log({ profile });
    //     return profile;
    //   },
    // }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
  ],

  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   if (url === "/dashboard") {
    //     return Promise.resolve("/dashboard");
    //   } else if (url === "/all-dashboard") {
    //     return Promise.resolve("/all-dashboard");
    //   } else {
    //     return Promise.resolve("/");
    //   }
    // },
    async jwt({ token, user }) {
      // console.log({ token, user });
      if (user) {
        return {
          ...token,
          name: user.name,
          role: user.role,
          image: user.image
          // id: user?.id
        };
      }
      return token;
    },
    async session({ session, token }) {
      // console.log({ session, token });
      return {
        ...session,
        user: {
          ...session.user,
          name: token?.name,
          role: token?.role,
          image: token?.image,
          id: token?.sub
        },
      };
    },
    
  },
};
