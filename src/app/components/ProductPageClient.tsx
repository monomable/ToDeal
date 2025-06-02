'use client';

import React, { useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import ShopBadge from "@/components/ShopBadge";
import PriceTrendChart from "@/components/PriceTrendChart";

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
  const [selectedImage, setSelectedImage] = useState<string>(`https://img.onemable.com/images/${product.filename}`);
  const [quantity, setQuantity] = useState(1);
  const sizes = ["XS", "S", "M", "L", "XL"];

  const imageList = [`https://img.onemable.com/images/${product.filename}`];

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 max-w-6xl mx-auto">
      {/* 이미지 영역 */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          {imageList.map((img, i) => (
            <div
              key={i}
              className="w-20 h-20 rounded border cursor-pointer overflow-hidden hover:border-red-500"
            >
              <img
                src={img}
                alt="thumb"
                className="w-full h-full object-cover"
                onClick={() => setSelectedImage(img)}
              />
            </div>
          ))}
        </div>
        <div className="flex-1">
          <div className="w-96 h-96 bg-gray-100 rounded overflow-hidden">
            <img
              src={selectedImage}
              alt="selected"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">{product.product_name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-sm text-gray-500">(150개 리뷰)</span>
            <span className="text-green-600 text-sm font-medium ml-2">재고 있음</span>
          </div>
        </div>

        <div className="text-2xl font-semibold">
          {product.product_price.toLocaleString()}원
        </div>

        <p className="mt-2">
          <ShopBadge shop={product.shop_info} />
        </p>

        {/* 수량 및 구매 */}
        <div className="space-y-4">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center border rounded overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 hover:bg-gray-100"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <div className="px-4 text-sm">{quantity}</div>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 hover:bg-gray-100"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-4">
              <button onClick={() => window.open(product.product_link, '_blank')} className="bg-red-500 text-white px-6 py-3 rounded text-sm hover:bg-red-600">
                지금 구매
              </button>
              <button className="bg-white text-black border px-6 py-3 rounded text-sm hover:bg-gray-200">
                장바구니
              </button>
            </div>
          </div>

          {/* 배송 & 반품 */}
          <div className="space-y-2 text-sm text-gray-700 mt-6">
            <div className="flex items-start gap-3">
              <span className="text-xl">🚚</span>
              <span>
                <strong className="text-black">무료 배송</strong>
                <br />
                오후 2시 전에 주문하면 당일 발송 가능 여부 확인
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">🔄</span>
              <span>
                <strong className="text-black">반품</strong>
                <br />
                30일 무료 반품. <a href="#" className="underline">자세히 보기</a>
              </span>
            </div>
          </div>

          <PriceTrendChart productLink={product.product_link} />
        </div>
      </div>
    </div>
  );
}
