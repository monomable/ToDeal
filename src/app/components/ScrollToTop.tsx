// app/components/ScrollToTop.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // 강제로 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}