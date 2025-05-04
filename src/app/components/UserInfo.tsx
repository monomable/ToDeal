'use client';

import { useSession, signIn, signOut } from "next-auth/react";

export default function UserInfo() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading...</p>;

  if (!session) {
    return (
      <button onClick={() => signIn("google")} className="mt-4 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
        🔑 Google 계정으로 로그인
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4 p-3 bg-white border border-black rounded-md shadow">
      <img
        src={session.user?.image ?? ''}
        alt="프로필"
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="text-sm font-medium">{session.user?.name}</p>
        <button onClick={() => signOut()} className="text-xs text-red-500">로그아웃</button>
      </div>
    </div>
  );
}
