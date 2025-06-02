'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';

interface CartProduct {
  id: number;
  product_name: string;
  product_price: number;
  shop_info: string;
  category: string;
  product_link: string;
  created_at: string;
  updated_at: string;
  filename: string;
  quantity: number;
}

export default function CartPage() {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  const fetchCart = useCallback(async () => {
    if (!session?.accessToken) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/server-api/cart/my`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      const data = await res.json();
      setCartItems(data.products || []);
    } catch (error) {
      console.error('❌ 장바구니 조회 실패:', error);
    }
  }, [session?.accessToken]);

  const handleDelete = async (item_id: number) => {
    if (!session?.accessToken) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/server-api/cart`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ item_id }),
      });

      if (res.ok) {
        setCartItems((prev) => prev.filter((item) => item.id !== item_id));
      } else {
        console.error('❌ 삭제 실패:', await res.text());
      }
    } catch (error) {
      console.error('❌ 삭제 요청 오류:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (!session) {
    return <p className="text-center text-gray-500 mt-10">로그인이 필요합니다.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-6">🛒 장바구니 ({cartItems.length}개)</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">장바구니가 비어 있습니다.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
              <img
                src={`https://img.onemable.com/images/${item.filename}`}
                alt={item.product_name}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-bold">{item.product_name}</h3>
              <p className="text-gray-700">가격: {item.product_price.toLocaleString()}원</p>
              <p className="text-gray-500">수량: {item.quantity}</p>
              <p className="text-sm text-gray-400 mt-1">{item.shop_info}</p>
              <div className="flex justify-between items-center mt-3">
                <a
                  href={item.product_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  상품 보기 →
                </a>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
