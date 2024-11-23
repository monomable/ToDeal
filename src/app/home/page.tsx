'use client';

import Link from "next/link";
import TableData from "@/src/app/ui/home/list/tabledata";
import { Suspense } from "react";
import { Spinner } from "@/src/app/ui/home/list/spinner";
import "../globals.css";
import { useEffect, useState } from "react";

export default function Page() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/images')
      .then(res => res.json())
      .then(data => {
        setImages(data.map((item: { image_base64: string }) => item.image_base64));
      });
  }, []);

    return (
    <div className="space-y-10 md:space-y-4">
      <div className="max-w-screen-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900dark:text-white">Best 핫딜</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="aspect-square w-full relative">
            <img 
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            src={`data:image/jpeg;base64,${image}`}
            alt={`핫딜 이미지 ${index + 1}`}
            />
          </div>
        ))
        /* 기존 이미지 코드
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
              <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt=""/>
          </div>
          <div>
              <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt=""/>
          </div>
          <div>
              <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt=""/>
          </div>
          <div>
              <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt=""/>
          </div>
          <div>
              <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt=""/>
          </div>
          <div>
              <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt=""/>
          </div>
      </div> */
      }
        </div>
      </div>
      <div className="max-w-screen-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

      <div className="flex items-center justify-between gap-1 mb-4">
      <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900dark:text-white">최신 핫딜</h4>
        </div>    
          <div className="">
            <div className="mb-2 w-full text-right">
              <Link href="/post/create" className="white-btn"> {/* 버튼 링크 연결 */}
                글쓰기
              </Link>
            </div>
            <Suspense fallback={<Spinner />}>
              <TableData/>
            </Suspense>
        </div>  
      </div>
    </div>
    );
  }