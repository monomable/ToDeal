// components/AuthStatusIcon.tsx
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { UserIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function AuthStatusIcon() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //if (status === 'loading') return null; // 로딩 중일 때는 표시 안함

  if (!session) {
    // 로그인하지 않은 상태 → 로그인 아이콘
    return (
      <button onClick={() => router.push('/auth')} title="로그인">
        <UserIcon className="w-8 h-8 text-gray-700 dark:text-white cursor-pointer hover:text-red-700 dark:hover:text-red-500" />
      </button>
    );
  }

  // 로그인한 상태 → 유저 프로필 이미지
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        title={session.user?.name ?? '프로필'}
        className="rounded-full overflow-hidden w-8 h-8 border border-gray-300"
      >
        <Image
          src={session.user?.image ?? '/default-profile.png'}
          alt="프로필"
          width={32}
          height={32}
          className="object-cover"
        />
      </button>

      {open && (
        <div className="absolute left-0 mt-2.5 w-32 bg-white rounded-md shadow-lg z-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <button
                onClick={() => {
                  router.push('/cart');
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                장바구니
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  router.push('/profile');
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                내 정보
              </button>
            </li>
            <li>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                로그아웃
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
