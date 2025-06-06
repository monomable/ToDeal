// types/next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { NextAuth } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  interface User {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
