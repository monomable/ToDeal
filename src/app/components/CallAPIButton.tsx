'use client';
import { useSession } from 'next-auth/react';

export default function CallAPIButton() {
  const { data: session } = useSession();

  const callAPI = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/serverapi/protected/profile`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      const contentType = res.headers.get('content-type');
      if (!res.ok) {
        console.error('❌ API 오류 상태:', res.status);
        const text = await res.text();
        console.warn('🧾 오류 응답 본문:', text);
        return;
      }

      if (contentType?.includes('application/json')) {
        const data = await res.json();
        console.log('✅ 응답 데이터:', data);
      } else {
        const fallback = await res.text();
        console.warn('⚠️ JSON 아님:', fallback);
      }
    } catch (err) {
      console.error('❌ fetch() 예외 발생:', err);
    }
    console.log('🔍 session:', session);
  };

  return <button onClick={callAPI}>Call Protected API</button>;
}
