'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export interface Product {
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

interface ProductItemProps {
  product: Product;
  wishlistItemIds: number[];
  onWishlistChange: () => void;
}

export default function ProductItem({
  product,
  wishlistItemIds,
  onWishlistChange,
}: ProductItemProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(wishlistItemIds.includes(product.id));
  }, [wishlistItemIds, product.id]);

  const handleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 방지

    if (!session?.accessToken) {
      alert('로그인이 필요합니다');
      router.push('/api/auth/signin');
      return;
    }

    const url = 'http://localhost:5000/server-api/wishlist';
    const method = isWishlisted ? 'DELETE' : 'POST';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({ item_id: product.id }),
    });

    if (res.ok) {
      setIsWishlisted(!isWishlisted);          // ✅ 즉시 UI 반영
      onWishlistChange();                      // ✅ 외부에서도 최신 상태 반영
    } else {
      alert('찜 처리에 실패했습니다.');
    }
  };

  const handleClick = () => {
    router.push(`/post/view/${product.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer hover:shadow-md rounded-lg p-4 transition"
    >
      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow z-10"
      >
        {isWishlisted ? '❤️' : '🤍'}
      </button>

      <div className="w-full aspect-[1/1] rounded-md overflow-hidden bg-gray-100">
        <img
          src={`https://img.onemable.com/images/${product.filename}`}
          alt={product.product_name}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="mt-4 text-lg font-medium">{product.product_name}</h3>
      <p className="text-red-500 text-xl">
        {product.product_price.toLocaleString()}원
      </p>
    </div>
  );
}
