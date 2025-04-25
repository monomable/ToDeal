'use client';

import Image from 'next/image';

import { StarIcon } from "@heroicons/react/24/solid";
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'HAVIT HV-G92 Gamepad',
    price: 120,
    oldPrice: 160,
    discount: 40,
    image: '/todeal-logo.png',
    rating: 4.5,
    reviews: 88,
  },
  {
    id: 2,
    name: 'AK-900 Wired Keyboard',
    price: 960,
    oldPrice: 1160,
    discount: 35,
    image: '/keyboard.png',
    rating: 3.5,
    reviews: 75,
    showButton: true, // "Add to Cart" 버튼 표시
  },
  {
    id: 3,
    name: 'IPS LCD Gaming Monitor',
    price: 370,
    oldPrice: 400,
    discount: 30,
    image: '/monitor.png',
    rating: 5.0,
    reviews: 99,
  },
  {
    id: 4,
    name: 'S-Series Comfort Chair',
    price: 375,
    oldPrice: 400,
    discount: 25,
    image: '/chair.png',
    rating: 4.5,
    reviews: 99,
  },
];

export default function FlashSaleProducts() {
  return (
    <Link href="/post/view/22">
    <div className="grid grid-cols-4 gap-6 w-full">
      {products.map((product) => (
        <div key={product.id} className="p-0 rounded-lg relative">
          {/* 할인율 배지 */}
          <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 text-sm rounded">
            -{product.discount}%
          </span>

          {/* 관심 & 조회 아이콘 */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="bg-white p-1 rounded-full shadow"><span>❤️</span></button>
            <button className="bg-white p-1 rounded-full shadow"><span>👁️</span></button>
          </div>

          {/* 상품 이미지 */}
          <Image src={product.image} alt={product.name} width={300} height={300} className="mx-auto bg-gray-100 rounded-md p-10" />

          {/* 상품명 */}
          <h3 className="mt-4 text-lg font-medium">{product.name}</h3>

          {/* 가격 정보 */}
          <p className="text-red-500 text-xl">
            {product.price}원 <span className="text-md text-gray-500 line-through ml-2">{product.oldPrice}원</span>
          </p>

          {/* 별점 및 리뷰 */}
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.floor(product.rating) }).map((_, index) => (
                <StarIcon key={index} className="w-6 h-6 text-yellow-500" />
            ))}
            <span className="text-gray-500">({product.reviews})</span>
          </div>

          {/* "Add to Cart" 버튼 (특정 상품만) */}
          {product.showButton && (
            <button className="w-full mt-3 bg-black text-white">Add To Cart</button>
          )}
        </div>
      ))}
    </div>
    </Link>
  );
}
