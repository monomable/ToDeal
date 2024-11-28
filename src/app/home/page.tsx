'use client';

import Link from "next/link";
import TableData from "@/ui/home/list/tabledata";
import { Suspense } from "react";
import { Spinner } from "@/ui/home/list/spinner";
import { useEffect, useState } from "react";
import "../globals.css";

interface HotDeal {
  image_base64: string;
  link: string;
}

export default function Page() {
  const [images, setImages] = useState<HotDeal[]>([]);

  useEffect(() => {
    fetch('/api/images')
      .then(res => res.json())
      .then(data => {
        setImages(data);
      });
  }, []);

    return (
    <div className="space-y-10 md:space-y-4 md:p-2">
      <div className="max-w-screen-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Best 핫딜</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Best 핫딜 */}
          {images.map((deal, index) => (
            <div key={index} className="aspect-square w-full relative">
              <a href={deal.link} target="_blank" rel="noopener noreferrer">
                <img 
                className="absolute inset-0 w-full h-full object-cover rounded-lg cursor-pointer"
                src={`data:image/jpeg;base64,${deal.image_base64}`}
                alt={`핫딜 이미지 ${index + 1}`}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-screen-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

        <div className="max-w-screen-md items-center justify-between gap-1 mb-4">
          <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">최신 핫딜</h4>
        </div>    
        <div className="">
          <div className="mb-2 w-full text-right hidden">
            <Link href="/post/create" className="white-btn"> {/* 버튼 링크 연결 */}
              글쓰기
            </Link>
          </div>
          <Suspense fallback={<Spinner />}>
            <TableData currentPage={1} />
          </Suspense>
        </div>  
      </div>
    </div>
    );
  }