'use client';

import Image from 'next/image';
import { HeartIcon, EyeIcon } from '@heroicons/react/24/outline';
import ItemHeader from './ItemHeader';

const relatedItems = [
  {
    id: 1,
    name: 'HAVIT HV-G92 Gamepad',
    price: '$120',
    originalPrice: '$160',
    discount: '-40%',
    image: '/images/gamepad.png',
    rating: 4.5,
    reviews: 88,
  },
  {
    id: 2,
    name: 'AK-900 Wired Keyboard',
    price: '$960',
    originalPrice: '$1160',
    discount: '-35%',
    image: '/images/keyboard.png',
    rating: 4.0,
    reviews: 75,
    inCart: true,
  },
  {
    id: 3,
    name: 'IPS LCD Gaming Monitor',
    price: '$370',
    originalPrice: '$400',
    discount: '-30%',
    image: '/images/monitor.png',
    rating: 4.8,
    reviews: 99,
  },
  {
    id: 4,
    name: 'RGB Liquid CPU Cooler',
    price: '$160',
    originalPrice: '$170',
    discount: '-10%',
    image: '/images/cooler.png',
    rating: 4.2,
    reviews: 65,
  },
];

export default function RelatedItems() {
  return (
    <div className="mt-12">
      <ItemHeader label="최근 조회" title="" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {relatedItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 relative group">
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {item.discount}
            </div>
            <div className="absolute top-2 right-2 flex gap-2">
              <HeartIcon className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer" />
              <EyeIcon className="w-5 h-5 text-gray-500 hover:text-blue-500 cursor-pointer" />
            </div>
            <img src={item.image} alt={item.name} className="mx-auto h-32 object-contain mb-4" />
            <h3 className="text-sm font-semibold text-gray-700 mb-1">{item.name}</h3>
            <div className="text-red-500 text-sm font-bold">
              {item.price}{' '}
              <span className="line-through text-gray-400 ml-2 font-normal">{item.originalPrice}</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-yellow-500">
              {'★'.repeat(Math.floor(item.rating))}
              {'☆'.repeat(5 - Math.floor(item.rating))}
              <span className="text-gray-500 ml-1">({item.reviews})</span>
            </div>
            {item.inCart && (
              <button className="mt-4 bg-black text-white py-2 w-full text-sm font-semibold rounded">
                Add To Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}