'use client';

import React, { useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import ShopBadge from "@/components/ShopBadge";
import PriceTrendChart from "@/components/PriceTrendChart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UnitPriceInfo from "./UnitPriceInfo";
import Image from "next/image";

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

export default function ProductPageClient({ product }: { product: Product }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string>(`https://img.onemable.com/images/${product.filename}`);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const imageList = [`https://img.onemable.com/images/${product.filename}`];

  const addToCart = async () => {
    if (!session?.accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/server-api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ item_id: product.id, quantity }),
      });

      if (res.ok) {
        setShowModal(true); // ✅ 장바구니 팝업 표시
      } else {
        const data = await res.json();
        alert(`추가 실패: ${data.error || '오류 발생'}`);
      }
    } catch (error) {
      console.error('장바구니 추가 오류:', error);
      alert('장바구니 추가 중 오류 발생');
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8 max-w-6xl mx-auto">
  {/* 📱 모바일 전용 이미지 */}
  <div className="block md:hidden mb-4">
    <div className="w-full aspect-square bg-gray-100 rounded overflow-hidden">
      <Image
        src={selectedImage}
        alt="selected"
        width={1000}
        height={1000}
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* 🖥️ 데스크탑용 이미지 + 썸네일 */}
  <div className="hidden md:flex gap-4">
    <div className="flex flex-col gap-4">
      {imageList.map((img, i) => (
        <div key={i} className="w-20 h-20 rounded border cursor-pointer overflow-hidden hover:border-red-500">
          <Image
            src={img}
            alt="thumb"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
            onClick={() => setSelectedImage(img)}
          />
        </div>
      ))}
    </div>
    <div className="flex-1">
      <div className="w-96 h-96 bg-gray-100 rounded overflow-hidden">
        <Image
          src={selectedImage}
          alt="selected"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>

  {/* 상품 정보 영역 */}
  <div className="flex-1 space-y-5 text-sm md:text-base">
    <div>
      <h2 className="text-xl md:text-2xl font-semibold">{product.product_name}</h2>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-yellow-400">★★★★★</span>
        <span className="text-gray-500">(150개 리뷰)</span>
        <span className="text-green-600 ml-2 font-medium">재고 있음</span>
      </div>
    </div>

    <div className="text-xl font-bold">
      <UnitPriceInfo product_name={product.product_name} product_price={product.product_price} />
      {product.product_price.toLocaleString()}원
    </div>

    <ShopBadge shop={product.shop_info} />

    <div className="space-y-4">
      {/* 수량 선택 */}
      <div className="flex items-center border rounded w-fit">
        <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-2 hover:bg-gray-100">
          <MinusIcon className="w-4 h-4" />
        </button>
        <div className="px-4">{quantity}</div>
        <button onClick={() => setQuantity((q) => q + 1)} className="p-2 hover:bg-gray-100">
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>

      {/* 버튼들 */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => window.open(product.product_link, '_blank')}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          지금 구매
        </button>
        <button
          onClick={addToCart}
          className="bg-white text-black border px-4 py-2 rounded hover:bg-gray-200"
        >
          장바구니
        </button>
      </div>

      {/* 배송/반품 */}
      <div className="space-y-3 text-gray-700 mt-4">
        <div className="flex gap-3">
          <span className="text-xl">🚚</span>
          <span>
            <strong className="text-black">무료 배송</strong><br />
            오후 2시 전에 주문하면 당일 발송 가능 여부 확인
          </span>
        </div>
        <div className="flex gap-3">
          <span className="text-xl">🔄</span>
          <span>
            <strong className="text-black">반품</strong><br />
            30일 무료 반품. <a href="#" className="underline">자세히 보기</a>
          </span>
        </div>
      </div>

      {/* 가격 추이 차트 */}
      <PriceTrendChart productLink={product.product_link} />
    </div>
  </div>
</div>

      {/* ✅ 장바구니 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm text-center space-y-4">
            <h2 className="text-lg font-semibold">🛒 장바구니에 추가되었습니다!</h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                계속 쇼핑하기
              </button>
              <button
                onClick={() => router.push('/main/cart')}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                장바구니로 이동
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
