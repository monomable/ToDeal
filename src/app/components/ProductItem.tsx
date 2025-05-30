'use client'
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
  wishlistItemIds: number[]; // ✅ 사용자가 찜한 상품 id 리스트
}

export default function ProductItem({ product, wishlistItemIds }: ProductItemProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(wishlistItemIds.includes(product.id));
  }, [wishlistItemIds, product.id]);

  const handleWishlist = async () => {
    if (!session?.accessToken) {
      alert('로그인이 필요합니다');
      router.push('/api/auth/signin');
      return;
    }

    const url = 'http://localhost:5000/server-api/wishlist';

    const res = await fetch(url, {
      method: isWishlisted ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({ item_id: product.id }),
    });

    if (res.ok) {
      setIsWishlisted(!isWishlisted); // 상태 반전
    } else {
      alert(isWishlisted ? '찜 해제 실패!' : '찜 추가 실패!');
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
      {/* 찜 버튼 */}
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
      <p className="text-red-500 text-xl">{product.product_price.toLocaleString()}원</p>
    </div>
  );
}