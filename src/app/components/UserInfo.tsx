'use client';

import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
      {session ? (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">👤 사용자 정보</h2>
          <p><strong>이름:</strong> {session.user?.name}</p>
          <p><strong>이메일:</strong> {session.user?.email}</p>
          <p className="break-all"><strong>Access Token:</strong> {session.accessToken}</p>
        </>
      ) : (
        <p className="text-gray-600">로그인된 사용자가 없습니다.</p>
      )}
    </div>
  );
}
