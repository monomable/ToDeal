'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

interface Keyword {
  id: number;
  keyword: string;
}

interface KeywordModalProps {
  onClose: () => void;
}

export default function KeywordModal({ onClose }: KeywordModalProps) {
  const { data: session } = useSession();
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const token = session?.accessToken;

  const modalRef = useRef<HTMLDivElement>(null);

  // ✅ 외부 클릭 시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // ✅ 기존 키워드 불러오기
  useEffect(() => {
    if (!token) return;
    const fetchKeywords = async () => {
      try {
        const res = await fetch('/server-api/user-keywords/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setKeywords(data.keywords || []);
      } catch (err) {
        console.error('❌ 키워드 불러오기 실패:', err);
      }
    };
    fetchKeywords();
  }, [token]);

  // ✅ 키워드 추가
  const addKeyword = async () => {
    if (!newKeyword.trim() || !token) return;

    const res = await fetch('/server-api/user-keywords/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ keyword: newKeyword.trim() }),
    });

    if (res.ok) {
      const added = await res.json();
      setKeywords(prev => [...prev, { id: added.id, keyword: newKeyword.trim() }]);
      setNewKeyword('');
    }
  };

  // ✅ 키워드 삭제
  const removeKeyword = async (id: number) => {
    if (!token) return;

    const res = await fetch(`/server-api/user-keywords/delete/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setKeywords(prev => prev.filter(k => k.id !== id));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-white rounded shadow p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg">✕</button>
        <h2 className="text-xl font-semibold mb-4">🔍 키워드 설정</h2>

        <div className="flex gap-2 mb-4">
          <input
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            placeholder="예: 우유, 과자"
            className="flex-1 border px-3 py-2 rounded"
          />
          <button onClick={addKeyword} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            추가
          </button>
        </div>

        <div className="space-y-2">
          {keywords.length === 0 ? (
            <p className="text-gray-500">등록된 키워드가 없습니다.</p>
          ) : (
            keywords.map((k) => (
              <div key={k.id} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded">
                <span>{k.keyword}</span>
                <button onClick={() => removeKeyword(k.id)} className="text-red-500 hover:text-red-700">삭제</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
