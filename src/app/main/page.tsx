'use client';

import Link from "next/link";
import FlashSaleProducts from "../components/FlashSaleProducts"
import CategoriesProducts from "../components/CategoriesProducts"
import ItemHeader from "@/components/ItemHeader";
//import 'styles/globals.css';
import RelatedItems from "@/components/RelatedItems";

interface HotDeal {
  image_base64: string;
  link: string;
}

export default function Page() {


    return (
      <div className="w-full">
        {/* 오늘의 핫딜 */}
        <div className="mb-10 mt-10">
          <ItemHeader label="지금 뜨는" title="식료품" />
        </div>
        <div className="mb-20">
          <FlashSaleProducts/>
        </div>
        <div className="flex justify-center mb-10">
          <Link href="/HotDeal" className="inline-block bg-red-500 text-white font-bold px-10 py-4 rounded-md hover:bg-red-600 transition">
            핫딜 더보기
          </Link>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* 카테고리 */}
        <div className="mt-10">
          <ItemHeader label="원하는 제품을 한눈에" title="카테고리"/>
        </div>

        <div className="mt-10 mb-20">
          <CategoriesProducts/>
        </div>

        <div className="flex justify-center mb-10">
          <Link href="/categories" className="inline-block bg-red-500 text-white font-bold px-10 py-4 rounded-md hover:bg-red-600 transition">
            모든 카테고리 보기
          </Link>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        <div className="mt-10 mb-20">
          <RelatedItems/>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

      </div>
    );
  }