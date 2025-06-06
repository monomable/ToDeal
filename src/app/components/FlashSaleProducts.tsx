'use client';

import { useEffect, useState, useCallback } from 'react';
import ProductItem, { Product } from './ProductItem';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

interface WishlistItem {
  item_id: number;
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    checkWidth(); // mount 시 바로 실행
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, [breakpoint]);

  return isMobile;
}

export default function LatestProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlistItemIds, setWishlistItemIds] = useState<number[]>([]);
  const { data: session } = useSession();
  const isMobile = useIsMobile(); // 👈 모바일 여부 확인

  const fetchWishlist = useCallback(async () => {
    if (!session?.accessToken) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/server-api/wishlist/my`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (res.status === 401) {
        console.warn('🔴 토큰 만료, 로그아웃 처리');
        signOut();
        return;
      }

      if (res.ok) {
        const data = await res.json();
        const ids = Array.isArray(data)
          ? data.map((item: WishlistItem) => item.item_id)
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

  // 👇 모바일이면 4개로 제한
  const displayedProducts = isMobile ? products.slice(0, 4) : products;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {displayedProducts.map((product) => (
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