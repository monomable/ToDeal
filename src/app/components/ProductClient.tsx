'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState, useCallback } from 'react';
import ProductItem from './ProductItem';

interface Product {
  id: number;
  product_name: string;
  product_price: number;
  shop_info: string;
  category: string;
  product_link: string;
  created_at: string;
  updated_at: string;
  filename: string;
}

export default function ProductClient({ products }: { products: Product[] }) {
  const { data: session } = useSession();
  const [wishlistItemIds, setWishlistItemIds] = useState<number[]>([]);

  const fetchWishlist = useCallback(async () => {
    if (!session?.accessToken) return;

    try {
      const res = await fetch('http://localhost:5000/server-api/wishlist/my', {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!res.ok) {
        console.error('❌ 응답 실패', res.status);
        return;
      }

      const data = await res.json();

      if (data && Array.isArray(data.wishlistItemIds)) {
        setWishlistItemIds(data.wishlistItemIds);
      } else {
        console.warn('⚠️ 예상과 다른 응답 구조:', data);
        setWishlistItemIds([]);
      }
    } catch (error) {
      console.error('❌ fetchWishlist 에러:', error);
    }
  }, [session?.accessToken]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return (
    <div className="relative z-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          wishlistItemIds={wishlistItemIds}
          onWishlistChange={fetchWishlist}
        />
      ))}
    </div>
  );
}
