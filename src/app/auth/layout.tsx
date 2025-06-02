// auth/layout.tsx
'use client';

//import React from "react";
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <SessionProvider>{children}</SessionProvider>
      </div>

  );
}
