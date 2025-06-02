'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ProductItem, { Product } from '@/components/ProductItem';
import ItemHeader from './ItemHeader';

const RecentlyViewedProducts = () => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [wishlistItemIds, setWishlistItemIds] = useState<number[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('recent_products');
      if (stored) {
        const parsed: Product[] = JSON.parse(stored);
        setRecentProducts(parsed.slice(0, 8));
      }
    } catch (err) {
      console.error('❌ 최근 본 상품 불러오기 실패:', err);
    }
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!session?.accessToken) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/server-api/wishlist/mylist`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        const data = await res.json();
        if (Array.isArray(data.products)) {
          setWishlistItemIds(data.products.map((item: Product) => item.id));
        }
      } catch (err) {
        console.error('❌ 위시리스트 조회 실패:', err);
      }
    };

    fetchWishlist();
  }, [session?.accessToken]);

  if (recentProducts.length === 0) return null;

  return (
    <div className="mb-10 mt-10">
      <ItemHeader label="최근 본 상품" title="" />
      <div className="mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-4">
          {recentProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              wishlistItemIds={wishlistItemIds}
              onWishlistChange={() => {}} // 필요하면 업데이트 함수 추가
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewedProducts;
