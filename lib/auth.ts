import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

// Cache for user role lookups to reduce database queries
const userRoleCache = new Map<string, string>();
const USER_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
        
        if (!user || !user.password) return null
        
        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null
        
        // Store in cache
        userRoleCache.set(user.id, user.role);
        setTimeout(() => userRoleCache.delete(user.id), USER_CACHE_TTL);
        
        return { 
          id: user.id, 
          email: user.email, 
          name: user.name,
          role: user.role 
        }
      }
    })
  ],
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/signin",
    newUser: "/signup"
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        // Check cache first
        if (user.email && userRoleCache.has(user.email)) {
          user.role = userRoleCache.get(user.email);
          return true;
        }
        
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! }
        });
        
        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name,
              image: user.image,
              role: "CUSTOMER"
            }
          });
          user.id = newUser.id;
          user.role = newUser.role;
          
          // Store in cache
          if (user.email) {
            userRoleCache.set(user.email, newUser.role);
            setTimeout(() => userRoleCache.delete(user.email), USER_CACHE_TTL);
          }
        } else {
          user.id = existingUser.id;
          user.role = existingUser.role;
          
          // Store in cache
          if (user.email) {
            userRoleCache.set(user.email, existingUser.role);
            setTimeout(() => userRoleCache.delete(user.email), USER_CACHE_TTL);
          }
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      
      // If this is a Google sign-in and role is not in token, check cache first
      if (account?.provider === "google" && !token.role && token.email) {
        // Check cache first
        if (token.email && userRoleCache.has(token.email)) {
          token.role = userRoleCache.get(token.email);
        } else {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email }
          });
          
          if (dbUser) {
            token.role = dbUser.role;
            token.id = dbUser.id;
            
            // Store in cache
            if (token.email) {
              userRoleCache.set(token.email, dbUser.role);
              setTimeout(() => userRoleCache.delete(token.email), USER_CACHE_TTL);
            }
          }
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  }
}