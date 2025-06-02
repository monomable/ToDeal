'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from "next/link";
import axios from 'axios';
import ShopBadge from '@/components/ShopBadge';
import UnitPriceInfo from '@/components/UnitPriceInfo';

interface MainProduct {
  id: number;
  product_name: string;
  product_price: number;
  shop_info: string;
  category: string;
  product_link: string;
  filename: string;
  created_at: string;
  updated_at: string;
}

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

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const [mainResults, setMainResults] = useState<MainProduct[]>([]);
  const [hotdealResults, setHotdealResults] = useState<Hotdeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) return;

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/server-api/search?search=${encodeURIComponent(query)}`
        );
        setMainResults(res.data.main || []);
        setHotdealResults(res.data.hotdeals || []);
      } catch (err) {
        console.error('❌ 검색 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (!query.trim()) return <div className="p-4">검색어를 입력해주세요.</div>;
  if (loading) return <div className="p-4">🔍 검색 중...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      <h1 className="text-2xl font-bold">🔎 검색 결과: "{query}"</h1>

      {/* 쇼핑몰 섹션 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">🛒 쇼핑몰</h2>
        {mainResults.length === 0 ? (
          <p className="text-gray-500">쇼핑몰 검색 결과가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainResults.map((product) => (
              <Link
                key={product.id}
                href={`/post/view/${product.id}`}
                className="block border rounded-lg p-4 shadow hover:shadow-md transition hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className="w-full aspect-square mb-3 overflow-hidden rounded">
                  <img
                    src={`https://img.onemable.com/images/${product.filename}`}
                    alt={product.product_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <ShopBadge shop={product.shop_info} />
                <h3 className="text-lg font-semibold">{product.product_name}</h3>
                <UnitPriceInfo product_name={product.product_name} product_price={product.product_price}/>
                <p className="text-red-500 text-xl">{product.product_price.toLocaleString()}원</p>
                
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 커뮤니티 핫딜 섹션 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">💬 커뮤니티 핫딜</h2>
        {hotdealResults.length === 0 ? (
          <p className="text-gray-500">커뮤니티 검색 결과가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotdealResults.map((deal) => (
              <div
                key={deal.id}
                className="border rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <div className="w-full aspect-square overflow-hidden rounded mb-2">
                  <img
                    src={`https://img.onemable.com/images/${deal.filepath}`}
                    alt={deal.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">{deal.title}</h3>
                <p className="text-gray-600">가격: {deal.price.toLocaleString()}</p>
                <p className="text-sm text-gray-400">출처: {deal.source_website}</p>
                <a
                  href={deal.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-600 hover:underline text-sm"
                >
                  게시글 보러가기 →
                </a>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
