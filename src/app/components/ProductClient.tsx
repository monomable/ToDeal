'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import ProductItem from './ProductItem'; // 위치 확인 필요

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

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!session?.accessToken) return;

      const res = await fetch('http://localhost:5000/server-api/wishlist/my', {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setWishlistItemIds(data.wishlistItemIds);
      }
    };

    fetchWishlist();
  }, [session]);

  return (
    <div className="grid grid-cols-4 gap-6 w-full">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} wishlistItemIds={wishlistItemIds} />
      ))}
    </div>
  );
}
