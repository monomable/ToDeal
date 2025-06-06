'use client';

import { useEffect, useState } from 'react';
import HotdealItem from '@/components/HotdealItem'; // 이미 구현한 아이템

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

export default function HotdealPreview() {
  const [hotdeals, setHotdeals] = useState<Hotdeal[]>([]);

  useEffect(() => {
    const fetchHotdeals = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/server-api/hotdeals`);
        const data = await res.json();
        setHotdeals(data.hotdeals.slice(0, 5)); // ✅ 상위 5개만 표시
      } catch (err) {
        console.error('🔥 핫딜 미리보기 로딩 실패:', err);
      }
    };

    fetchHotdeals();
  }, []);

  if (hotdeals.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="space-y-4">
        {hotdeals.map((deal) => (
          <HotdealItem key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
}
