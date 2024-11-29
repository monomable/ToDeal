'use client';

import PostData from '@/ui/home/list/postmaindata'
import Link from 'next/link'
import {PencilIcon} from '@heroicons/react/24/outline'
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const pageGroupSize = 5; // 한 그룹당 보여줄 페이지 수
    const [totalPages, setTotalPages] = useState(0);

    // 현재 페이지 그룹 계산
    const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
    const startPage = currentGroup * pageGroupSize + 1;
    const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

    const handlePageChange = (page: number) => {
        router.push(`/home/post?page=${page}`);
    };

    return (
      <div className='p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <div className="mb-0 w-full text-right">
          <Link href="/post/create">
            <button className='white-btn px-3 py-2 inline-flex items-center'>
              <PencilIcon className='size-4'/>
              <span>글쓰기</span>
            </button>
          </Link>
        </div>
        <div className=''>
          <PostData 
            currentPage={currentPage}
            onTotalPagesChange={setTotalPages}
          />
        </div>
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
                {[...Array(Math.min(pageGroupSize, endPage - startPage + 1))].map((_, i) => {
                  const pageNumber = startPage + i;
                  return (
                    <li key={i}>
                      <button
                        onClick={() => handlePageChange(pageNumber)}
                        disabled={pageNumber > totalPages}
                        className={`flex items-center justify-center px-3 h-8 leading-tight ${
                          currentPage === pageNumber
                            ? 'text-blue-600 border border-gray-300 bg-blue-50'
                            : 'text-gray-500 bg-white border border-gray-300'
                        } hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50`}>
                        {pageNumber}
                      </button>
                    </li>
                  );
                })}
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50">
                    다음
                  </button>
                </li>
              </ul>
            </nav>
          </div>
      </div>
    )
  }