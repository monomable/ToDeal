'use client';

import { useEffect, useState, useCallback } from 'react';
import ProductItem, { Product } from '@/components/ProductItem';
import { useSession } from 'next-auth/react';

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlistItemIds, setWishlistItemIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 20;
  const { data: session } = useSession();

  // ✅ 찜 목록 가져오기
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

  // ✅ 상품 목록 가져오기
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/server-api/products?page=${currentPage}`
      );
      if (!res.ok) throw new Error('상품 불러오기 실패');

      const data = await res.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchProducts, fetchWishlist]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="max-w-8xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">🛒 전체 상품 보기</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">상품이 없습니다.</p>
      ) : (
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
      )}

      {/* ✅ 페이지네이션 */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          이전
        </button>
        <span className="font-medium">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => (p < totalPages ? p + 1 : p))}
          disabled={currentPage >= totalPages}
          className="px-4 py-2 bg-red-300 hover:bg-red-400 rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
}
