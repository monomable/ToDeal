// 예: CallAPIButton.tsx
'use client';
import { useSession } from 'next-auth/react';

export default function CallAPIButton() {
  const { data: session } = useSession();

  const callAPI = async () => {
    const res = await fetch('http://localhost:5000/api/protected/profile', {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const data = await res.json();
    console.log(data);
  };

  return <button onClick={callAPI}>Call Protected API</button>;
}
