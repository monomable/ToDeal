'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function WishlistPage() {
  const wishlistItems = [
    {
      name: 'Gucci duffle bag',
      price: 960,
      oldPrice: 1160,
      discount: '-35%',
      image: '/images/bag.png',
    },
    {
      name: 'RGB liquid CPU Cooler',
      price: 1960,
      image: '/images/cooler.png',
    },
    {
      name: 'GP11 Shooter USB Gamepad',
      price: 550,
      image: '/images/gamepad.png',
    },
    {
      name: 'Quilted Satin Jacket',
      price: 750,
      image: '/images/jacket.png',
    },
  ];

  const recommendedItems = [
    {
      name: 'ASUS FHD Gaming Laptop',
      price: 960,
      oldPrice: 1160,
      discount: '-35%',
      rating: 5,
      image: '/images/laptop.png',
    },
    {
      name: 'IPS LCD Gaming Monitor',
      price: 1160,
      rating: 5,
      image: '/images/monitor.png',
    },
    {
      name: 'HAVIT HV-G92 Gamepad',
      price: 560,
      label: 'NEW',
      rating: 5,
      image: '/images/havit.png',
    },
    {
      name: 'AK-900 Wired Keyboard',
      price: 200,
      rating: 5,
      image: '/images/keyboard.png',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Wishlist ({wishlistItems.length})</h2>
        <button className="border px-4 py-2 rounded">Move All To Bag</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {wishlistItems.map((item, idx) => (
          <div key={idx} className="bg-white p-2 rounded shadow relative">
            {item.discount && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                {item.discount}
              </span>
            )}
            <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
              🗑 {/* Trash icon */}
            </button>
            <img src={item.image} alt={item.name} className="w-full h-36 object-contain" />
            <button className="bg-black text-white w-full py-2 mt-2">Add To Cart</button>
            <div className="mt-2 text-sm">
              <div>{item.name}</div>
              <div className="text-red-600">${item.price}</div>
              {item.oldPrice && <div className="line-through text-gray-400">${item.oldPrice}</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-red-500 rounded"></div>
          <h2 className="text-lg font-semibold">Just For You</h2>
        </div>
        <Link href="#" className="border px-4 py-2 rounded">
          See All
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendedItems.map((item, idx) => (
          <div key={idx} className="bg-white p-2 rounded shadow relative">
            {item.discount && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                {item.discount}
              </span>
            )}
            {item.label && (
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                {item.label}
              </span>
            )}
            <button className="absolute top-2 right-2 text-gray-500 hover:text-black">👁</button>
            <img src={item.image} alt={item.name} className="w-full h-36 object-contain" />
            <button className="bg-black text-white w-full py-2 mt-2">Add To Cart</button>
            <div className="mt-2 text-sm">
              <div>{item.name}</div>
              <div className="text-red-600">${item.price}</div>
              {item.oldPrice && <div className="line-through text-gray-400">${item.oldPrice}</div>}
              <div className="text-yellow-500 text-xs">★★★★★ (65)</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
