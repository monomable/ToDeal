'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ShopBadge from '@/components/ShopBadge';
import UnitPriceInfo from '@/components/UnitPriceInfo';
import Image from 'next/image';

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
  const router = useRouter();

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

  const updateQuantity = async (item_id: number, newQuantity: number) => {
    if (!session?.accessToken || newQuantity < 1) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/server-api/cart`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ item_id, quantity: newQuantity }),
      });

      if (res.ok) {
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === item_id ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        console.error('❌ 수량 변경 실패:', await res.text());
      }
    } catch (error) {
      console.error('❌ 수량 변경 요청 오류:', error);
    }
  };

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
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-6">🛒 장바구니 ({cartItems.length}개)</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">장바구니가 비어 있습니다.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
  key={item.id}
  onClick={() => router.push(`/post/view/${item.id}`)}
  className="flex flex-col md:flex-row gap-4 items-start md:items-center border rounded-lg p-4 shadow hover:shadow-md transition"
>
  {/* 이미지 */}
  <Image
    src={`https://img.onemable.com/images/${item.filename}`}
    alt={item.product_name}
    width={500}
    height={500}
    className="w-full md:w-40 h-40 object-cover rounded"
  />

  {/* 내용 */}
  <div className="flex-1 w-full">
    <h3 className="text-base md:text-lg font-semibold mb-1 line-clamp-2">
      {item.product_name}
    </h3>

    <ShopBadge shop={item.shop_info} />
    <UnitPriceInfo
      product_name={item.product_name}
      product_price={item.product_price}
    />
    <p className="text-gray-700 mb-2 text-sm md:text-base">
      제품 가격: {item.product_price.toLocaleString()}원
    </p>

    {/* 수량/총액/버튼 */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-3 gap-3">
      {/* 수량 & 총액 */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={(e) => {
            e.stopPropagation();
            updateQuantity(item.id, item.quantity - 1);
          }}
          className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          -
        </button>
        <span className="min-w-[24px] text-center">{item.quantity}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            updateQuantity(item.id, item.quantity + 1);
          }}
          className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
        <span className="ml-4 text-sm text-gray-700">
          총액: {(item.product_price * item.quantity).toLocaleString()}원
        </span>
      </div>

      {/* 버튼 */}
      <div className="flex gap-2 flex-wrap">
        <a
          href={item.product_link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="bg-blue-500 text-white text-sm px-4 py-1 rounded hover:bg-blue-600 transition"
        >
          구매 바로가기
        </a>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(item.id);
          }}
          className="bg-red-500 text-white text-sm px-4 py-1 rounded hover:bg-red-600 transition"
        >
          삭제
        </button>
      </div>
    </div>
  </div>
</div>
          ))}
        </div>
      )}
    </div>
  );
}
