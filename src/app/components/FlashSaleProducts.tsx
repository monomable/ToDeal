'use client';

import { useEffect, useState } from 'react';
import ProductItem, { Product } from './ProductItem'; // ProductItem 경로 조정
import { useSession } from 'next-auth/react';

export default function LatestProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlistItemIds, setWishlistItemIds] = useState<number[]>([]);
  const { data: session } = useSession();

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

    const fetchWishlist = async () => {
      if (!session?.accessToken) return;
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/server-api/wishlist`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        const ids = data.map((item: any) => item.item_id); // item_id 기준
        setWishlistItemIds(ids);
      }
    };

    fetchProducts();
    fetchWishlist();
  }, [session]);

  if (!products.length) {
    return <p className="text-center text-gray-500 mt-10">상품을 불러오는 중입니다...</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} wishlistItemIds={wishlistItemIds} />
      ))}
    </div>
  );
}
