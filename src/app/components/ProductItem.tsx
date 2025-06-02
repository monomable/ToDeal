'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ShopBadge from '@/components/ShopBadge';
import UnitPriceInfo from './UnitPriceInfo';

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
    e.stopPropagation();

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
      setIsWishlisted(!isWishlisted);
      onWishlistChange();
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
      className="relative cursor-pointer border hover:shadow-md rounded-lg overflow-hidden transition"
    >
      {/* 이미지 영역 */}
      <div className="relative w-full aspect-[1/1]">
        <img
          src={`https://img.onemable.com/images/${product.filename}`}
          alt={product.product_name}
          className="w-full h-full object-cover"
        />

        {/* 좌상단 ShopBadge */}
        <div className="absolute top-2 left-2 z-10">
          <ShopBadge shop={product.shop_info} />
        </div>

        {/* 우상단 Wishlist 버튼 */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow z-10 transition-colors duration-200 hover:bg-red-100"
        >
          <span className="text-xl transition-colors duration-200 hover:text-red-500">
            {isWishlisted ? '❤️' : '🤍'}
          </span>
        </button>
      </div>

      {/* 상품명 / 가격 */}
      <div className="mt-2 px-2 pb-2">
        <h3 className="text-lg font-medium leading-snug line-clamp-2">{product.product_name}</h3>
        <UnitPriceInfo product_name={product.product_name} product_price={product.product_price}/>
        <p className="text-red-500 text-xl">{product.product_price.toLocaleString()}원</p>
      </div>
    </div>
  );
}
