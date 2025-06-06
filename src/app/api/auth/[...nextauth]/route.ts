// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from '../../../../lib/auth'; // 위에서 만든 파일

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
