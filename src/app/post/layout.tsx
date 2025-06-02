"use client"; // Next.js 13+ App Router에서 클라이언트 컴포넌트로 지정

import TopNavBar from "../components/TopNavBar";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <SessionProvider>
      <TopNavBar/>
      <div className="max-w-screen-xl flex-grow p-6 h-dvh md:p-4 md:mx-auto md:w-4/5">{children}</div>
    </SessionProvider>

    
  );
}
