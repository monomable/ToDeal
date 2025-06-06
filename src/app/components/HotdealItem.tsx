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
      className="flex items-center gap-4 p-4 border rounded-lg bg-white hover:shadow-md transition cursor-pointer w-full"
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
      <div className="flex-1 min-w-0">
        {/* 모바일 전용 뱃지 (제목 위에 표시) */}
        <span className="block md:hidden text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold mb-1 w-fit">
          진행중
        </span>

        {/* 제목 */}
        <h3 className="text-md font-semibold text-gray-800 truncate md:line-clamp-2 w-full">
          {deal.title}
        </h3>

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

      {/* PC 전용 뱃지 (기존 오른쪽 위치 유지) */}
      <span className="hidden md:inline-block text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold whitespace-nowrap">
        진행중
      </span>
    </Link>
  );
};

export default HotdealItem;
