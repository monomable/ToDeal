'use client';

import { useSession } from "next-auth/react";

export default function CallAPIButton() {
  const { data: session } = useSession();

  const callAPI = async () => {
    if (!session?.accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/protected", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!res.ok) throw new Error("API 호출 실패");

      const data = await res.json();
      alert(`응답: ${JSON.stringify(data, null, 2)}`);
    } catch (err) {
      alert(`오류 발생: ${(err as Error).message}`);
    }
  };

  return (
    <button
      onClick={callAPI}
      className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
    >
      백엔드 API 호출
    </button>
  );
}
