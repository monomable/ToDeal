// components/LoginGoogle.tsx
'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function UserInfo() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <button onClick={() => signIn("google", { callbackUrl: "/main" })} className="w-full py-2 flex items-center justify-center gap-2 border border-gray-300 rounded hover:bg-gray-100">
        <Image
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        width={20}
        height={20}
        className="w-5 h-5"
        />
        <span>Google 계정으로 로그인</span>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4 p-3 bg-white border border-black rounded-md shadow">
      <Image
        src={session.user?.image ?? ''}
        alt="프로필"
        width={40}
        height={40}
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="text-sm font-medium">{session.user?.name}</p>
        <button onClick={() => signOut()} className="text-xs text-red-500">로그아웃</button>
      </div>
    </div>
  );
}
