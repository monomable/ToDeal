import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2/promise';
import userDB from '../../server/DB/userDB';

interface UserRow extends RowDataPacket {
  id: number;
  email: string;
  password: string;
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials ?? {};
        if (!email || !password) return null;

        const [rows] = await userDB.execute<UserRow[]>(
          'SELECT * FROM users WHERE email = ?',
          [email]
        );

        if (!rows || rows.length === 0) return null;

        const user = rows[0];
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return { id: String(user.id), email: user.email };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account || user) {
        token.accessToken = jwt.sign(
          {
            sub: token.sub ?? String(user?.id),
            email: token.email ?? user?.email,
          },
          process.env.JWT_SECRET!,
          { expiresIn: '12h' }
        );
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === 'production'
          ? '__Secure-next-auth.session-token'
          : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production', // ✅ HTTPS 적용 시 필수
      },
    },
  },
  useSecureCookies: process.env.NODE_ENV === 'production',
  secret: process.env.JWT_SECRET,
  debug: process.env.NODE_ENV !== 'production', // 개발 중 debug 로그 보기
};
