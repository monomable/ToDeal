'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [productId, setProductId] = useState('');

  const router = useRouter();

  const handleVerify = async () => {
    const res = await fetch('/server-api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      setAuthorized(true);
    } else {
      setError('❌ 인증 실패: 올바른 접근 키가 아닙니다.');
    }
  };

  if (!authorized) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-sm">
          <h2 className="text-lg font-bold mb-4 text-center">🔐 관리자 인증</h2>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="접근 키 입력"
            className="w-full px-3 py-2 border rounded mb-2"
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            onClick={handleVerify}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            인증하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📊 관리자 대시보드</h1>

      {/* ✅ 전체 알림 발송 */}
      <section className="bg-white p-6 rounded shadow mb-6 border">
        <h2 className="text-xl font-semibold mb-2">📢 전체 사용자 알림 전송</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await fetch('/server-api/admin/notify-all', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message }),
            });
            const data = await res.json();
            alert(data.success ? '✅ 알림 전송 완료' : `❌ 전송 실패: ${data.error}`);
            setMessage('');
          }}
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="알림 내용을 입력하세요"
            className="w-full border rounded p-3 mb-3 h-24 resize-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            전송하기
          </button>
        </form>
      </section>

      {/* ✅ 특정 상품 알림 */}
      <section className="bg-white p-6 rounded shadow border">
        <h2 className="text-xl font-semibold mb-2">📦 상품 ID로 알림 전송</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await fetch('/server-api/admin/notify-product', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ productId }),
            });
            const data = await res.json();
            alert(data.success ? '✅ 상품 알림 전송 완료' : `❌ 실패: ${data.error}`);
            setProductId('');
          }}
        >
          <input
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="상품 ID 입력"
            className="w-full border px-3 py-2 rounded mb-3"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            전송하기
          </button>
        </form>
      </section>
    </div>
  );
}
