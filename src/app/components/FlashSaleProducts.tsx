'use client';

import { useEffect, useState, useCallback } from 'react';
import ProductItem, { Product } from './ProductItem';
import { useSession } from 'next-auth/react';

export default function LatestProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlistItemIds, setWishlistItemIds] = useState<number[]>([]);
  const { data: session } = useSession();

  const fetchWishlist = useCallback(async () => {
    if (!session?.accessToken) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/server-api/wishlist/my`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        const ids = Array.isArray(data)
          ? data.map((item: any) => item.item_id)
          : data.wishlistItemIds || [];
        setWishlistItemIds(ids);
      } else {
        console.error('❌ 찜 목록 불러오기 실패:', res.status);
      }
    } catch (err) {
      console.error('❌ 찜 목록 요청 오류:', err);
    }
  }, [session?.accessToken]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/server-api/products/latest`);
        if (!res.ok) throw new Error('상품 불러오기 실패');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
    fetchWishlist();
  }, [fetchWishlist]);

  if (!products.length) {
    return <p className="text-center text-gray-500 mt-10">상품을 불러오는 중입니다...</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
