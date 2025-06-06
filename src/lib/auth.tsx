// src/lib/auth.ts
import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2/promise';
import userDB from '../../server/DB/userDB'; // 경로는 위치에 따라 조정하세요

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
  session: { strategy: 'jwt' },
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
  secret: process.env.JWT_SECRET,
};