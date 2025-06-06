'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Hotdeal {
  id: number;
  title: string;
  link: string;
  category: string;
  price: number;
  created_at: string;
  source_website: string;
  filepath: string;
}

interface Props {
  deal: Hotdeal;
}

const HotdealItem: React.FC<Props> = ({ deal }) => {
  return (
    <Link
      href={deal.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 border rounded-lg bg-white hover:shadow-md transition cursor-pointer"
    >
      {/* 이미지 */}
      <Image
        src={`https://img.onemable.com/images/${deal.filepath}`}
        alt={deal.title}
        width={112}
        height={112}
        className="w-28 h-28 object-cover rounded-md border"
      />

      {/* 내용 */}
      <div className="flex-1">
        {/* 제목 */}
        <h3 className="text-md font-semibold text-gray-800 line-clamp-2">{deal.title}</h3>

        {/* 메타 정보 */}
        <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-x-4">
          <span>카테고리: {deal.category}</span>
          <span>{deal.source_website}</span>
        </div>

        {/* 가격 */}
        <div className="mt-2 text-lg font-bold text-red-600">
          {deal.price.toLocaleString()}
        </div>
      </div>

      {/* 태그 or 뱃지 */}
      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold whitespace-nowrap">
        진행중
      </span>
    </Link>
  );
};

export default HotdealItem;
