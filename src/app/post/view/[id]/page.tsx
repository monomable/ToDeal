"use client";
   
import React, { useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import axios from 'axios' // https 비동기 통신 라이브러리
import Link from "next/link";
import "../../../globals.css"
import ShopBadge from "@/components/ShopBadge"; // 상단에 import 추가

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

type Props = {
    params: {
      id: string;
    }
  }
  
export default function ProductPage({ params }: Props) {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("red");
  const [selectedSize, setSelectedSize] = useState("M");
  const [product, setProduct] = useState<Product | null>(null);

  const sizes = ["XS", "S", "M", "L", "XL"];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/server-api/products/${params.id}`
        );
        const fetchedProduct: Product = res.data;
        setProduct(fetchedProduct);
        setSelectedImage(`https://img.onemable.com/images/${fetchedProduct.filename}`);
      } catch (err) {
        console.error("Failed to load product:", err);
      }
    };
    fetchProduct();
  }, [params.id]);

  if (!product) return <div className="p-8">로딩 중...</div>;

  const imageList = [
    `https://img.onemable.com/images/${product.filename}`,
  ];

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
        
        <div className="space-y-4">

          {/* 수량 + 구매 버튼 */}
          <div className="flex items-center gap-4">
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
            <button className="bg-red-500 text-white px-6 py-3 rounded text-sm hover:bg-red-600">
              지금 구매
            </button>
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

          <PriceTrendChart />
        </div>
      </div>
    </div>
  );
}