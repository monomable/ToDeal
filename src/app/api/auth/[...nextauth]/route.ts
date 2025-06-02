import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import jwt from 'jsonwebtoken';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // ✅ 우리가 직접 JWT accessToken 발급
        token.accessToken = jwt.sign(
          { sub: token.sub, email: token.email },
          process.env.JWT_SECRET!,
          { expiresIn: "12h" }
        );
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};

// ✅ App Router용 HTTP Method export
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };