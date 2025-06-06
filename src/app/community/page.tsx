'use client';

import { useEffect, useState } from 'react';
import HotdealItem from '@/components/HotdealItem';

interface Hotdeal {
  id: number;
  title: string;
  link: string;
  category: string;
  price: number;
  created_at: string;
  source_website: string;
  filepath: string;
}

export default function HotdealsPage() {
  const [hotdeals, setHotdeals] = useState<Hotdeal[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchHotdeals = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/server-api/hotdeals?page=${page}`);
        if (!res.ok) throw new Error('핫딜 데이터 로딩 실패');
        const data = await res.json();
        setHotdeals(data.hotdeals);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchHotdeals();
  }, [page]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  if (error) {
    return <p className="text-red-500 text-center mt-10">🔥 {error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-0 md:p-6">
      <h1 className="text-2xl font-bold mb-6">🔥 핫딜 모음</h1>

      {hotdeals.length === 0 ? (
        <p className="text-gray-500 text-center">등록된 핫딜이 없습니다.</p>
      ) : (
        <>
          <div className="space-y-4">
            {hotdeals.map((deal) => (
              <HotdealItem key={deal.id} deal={deal} />
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              이전
            </button>
            <span className="text-sm text-gray-700">
              {page} / {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-4 py-2 bg-red-200 rounded disabled:opacity-50"
            >
              다음
            </button>
          </div>
        </>
      )}
    </div>
  );
}
