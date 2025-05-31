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

interface ProductResponse {
  products: Product[];
  total: number;
}

interface Props {
  category: string;
}

export default function ProductClient({ category }: Props) {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlistItemIds, setWishlistItemIds] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 20;

  // ✅ 상품 데이터 가져오기
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/server-api/products?category=${category}&page=${page}`
      );
      const data: ProductResponse = await res.json();
      setProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      console.error('❌ 상품 로딩 오류:', error);
    }
  }, [category, page]);

  // ✅ 찜 목록 가져오기
  const fetchWishlist = useCallback(async () => {
    if (!session?.accessToken) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/server-api/wishlist/my`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      const data = await res.json();
      if (data && Array.isArray(data.wishlistItemIds)) {
        setWishlistItemIds(data.wishlistItemIds);
      }
    } catch (error) {
      console.error('❌ 찜 목록 로딩 실패:', error);
    }
  }, [session?.accessToken]);

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, [fetchProducts, fetchWishlist]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            wishlistItemIds={wishlistItemIds}
            onWishlistChange={fetchWishlist}
          />
        ))}
      </div>

      {/* ✅ 페이지네이션 컨트롤 */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 text-sm border rounded disabled:opacity-50"
        >
          이전
        </button>
        <span className="text-sm">
          {page} / {Math.ceil(total / pageSize)} 페이지
        </span>
        <button
          onClick={() => setPage((p) => (p * pageSize < total ? p + 1 : p))}
          disabled={page * pageSize >= total}
          className="px-4 py-2 text-sm border rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
}
