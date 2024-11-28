'use client';

import Link from "next/link";
import TableData from "@/ui/home/list/tabledata";
import { Suspense } from "react";
import { Spinner } from "@/ui/home/list/spinner";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const pageGroupSize = 5; // 한 그룹당 보여줄 페이지 수

    // 현재 페이지 그룹 계산
    const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
    const startPage = currentGroup * pageGroupSize + 1;
    const endPage = startPage + pageGroupSize - 1;

    const handlePageChange = (page: number) => {
        router.push(`/home/list?page=${page}`);
    };

    return (
    <div className="max-w-screen-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 md:m-2">
      <div className="flex items-center justify-between gap-1 mb-5">
        <h1 className="text-4xl font-bold">최신 핫딜</h1>
      </div>    
        <div className="max-w-screen-md">
          <div className="mb-2 w-full text-left">
            {/*<Link
              href="/user/create" // 버튼 링크 연결
              className="btn btn-primary">
              Create
            </Link> */}
          </div>
          <Suspense fallback={<Spinner />}>
            <TableData currentPage={currentPage} />
          </Suspense>
          
          {/* 페이지네이션 UI */}
          <div className="flex items-center justify-center space-x-1 mt-4">
            <nav aria-label="페이지 탐색">
              <ul className="flex items-center -space-x-px h-8 text-sm">
                <li>
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50">
                    이전
                  </button>
                </li>
                {[...Array(pageGroupSize)].map((_, i) => {
                  const pageNumber = startPage + i;
                  return (
                    <li key={i}>
                      <button
                        onClick={() => handlePageChange(pageNumber)}
                        className={`flex items-center justify-center px-3 h-8 leading-tight ${
                          currentPage === pageNumber
                            ? 'text-blue-600 border border-gray-300 bg-blue-50'
                            : 'text-gray-500 bg-white border border-gray-300'
                        } hover:bg-gray-100 hover:text-gray-700`}>
                        {pageNumber}
                      </button>
                    </li>
                  );
                })}
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    다음
                  </button>
                </li>
              </ul>
            </nav>
          </div>
      </div>  
    </div>
    );
}