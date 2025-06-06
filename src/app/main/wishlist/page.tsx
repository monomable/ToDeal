'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import ProductItem from '../../components/ProductItem';

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

export default function WishlistPage() {
  const { data: session } = useSession();
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [wishlistItemIds, setWishlistItemIds] = useState<number[]>([]);

  const fetchWishlist = useCallback(async () => {
    if (!session?.accessToken) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/server-api/wishlist/mylist`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      const data = await res.json();

      if (Array.isArray(data.products)) {
        setWishlistProducts(data.products);
        const ids = data.products.map((item: Product) => item.id);
        setWishlistItemIds(ids);
      } else {
        console.warn('예상과 다른 응답 구조:', data);
      }
    } catch (error) {
      console.error('찜 목록 가져오기 실패:', error);
    }
  }, [session?.accessToken]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  if (!session) {
    return <p className="text-center text-gray-500 mt-10">로그인이 필요합니다.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-6">찜한 상품 목록 ({wishlistProducts.length})</h2>

      {wishlistProducts.length === 0 ? (
        <p className="text-gray-500">찜한 상품이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wishlistProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              wishlistItemIds={wishlistItemIds}
              onWishlistChange={fetchWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}
