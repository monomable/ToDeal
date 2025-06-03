'use client';

import { SessionProvider } from 'next-auth/react';
import NotificationButtonWrapper from './NotificationBell'; // 종 버튼
//import KeywordAlertClient from './KeywordAlertClient'; // 키워드 알림 클라이언트 (있다면)

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NotificationButtonWrapper />
      <div className="max-w-screen-xl flex-grow p-6 h-dvh md:p-4 md:mx-auto md:w-4/5">
        {children}
      </div>
    </SessionProvider>
  );
}
