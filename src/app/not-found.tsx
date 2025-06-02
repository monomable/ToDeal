"use client"; // Next.js 13+ App Router에서 클라이언트 컴포넌트로 지정

import Link from "next/link";

import TopNavBar from "./components/TopNavBar";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 relative">
      <SessionProvider>
        <TopNavBar/>
      </SessionProvider>

      <div className="max-w-screen-xl flex-grow p-6 h-dvh md:p-4 md:mx-auto md:w-4/5">
        
        <div className="min-h-screen flex flex-col items-center justify-center text-gray-800 text-center p-6">
          <h1 className="text-4xl font-bold mb-4">404 - 페이지를 찾을 수 없습니다</h1>
          <p className="mb-6">죄송합니다. 요청하신 페이지가 존재하지 않거나 이동되었어요.</p>
          <Link
              href="/"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
          >
              홈으로 돌아가기
          </Link>
        </div>

      </div>

    </nav>

    
  );
}
