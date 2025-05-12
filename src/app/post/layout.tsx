"use client"; // Next.js 13+ App Router에서 클라이언트 컴포넌트로 지정

import { useState } from "react";
import TopNavBar from "../components/TopNavBar";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <SessionProvider>
      <TopNavBar/>
      <div className="max-w-screen-xl flex-grow p-6 h-dvh md:p-4 md:mx-auto md:w-4/5">{children}</div>
    </SessionProvider>

    
  );
}
