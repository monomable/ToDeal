// components/TopNavBar.tsx
'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import AuthStatusIcon from "../components/AuthStatusIcon";

export default function TopNavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 relative">
        <div className="max-w-screen-xl flex items-center mx-auto p-4 relative z-50">
          <Link href="/main" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src="/todeal-logo.png" width={1000} height={1000} className="h-28 w-28" alt="todeal Logo" priority />
          </Link>

          {/* 내비게이션 메뉴 */}
          <div className={`${isMobileMenuOpen ? "block" : "hidden"} absolute top-full left-0 w-full bg-white md:relative md:block md:w-auto md:left-1/3 md:-translate-x-1/2 md:bg-transparent md:top-10`} >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block font-bold py-2 px-3 text-white bg-red-700 rounded-md md:bg-transparent md:text-red-700 md:p-0 md:dark:text-red-500 dark:bg-red-600 md:dark:bg-transparent">
                  메인
                </Link>
              </li>

              {/* 드롭다운 메뉴 */}
              <li className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex font-bold items-center justify-between w-full py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-red-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  카테고리
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* 드롭다운 메뉴 리스트 */}
                <div className={`${isDropdownOpen ? "block" : "hidden"} absolute z-50 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600`}>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                    <li>
                      <Link href="/categories/vegetable" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        야채
                      </Link>
                    </li>
                    <li>
                      <Link href="/categories/fruit" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        과일
                      </Link>
                    </li>
                    <li>
                      <Link href="/categories/meat" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        육류
                      </Link>
                    </li>
                    <li>
                      <Link href="/categories/seafood" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        해산물
                      </Link>
                    </li>
                  </ul>
                  <div className="py-1">
                    <Link href="/categories" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      더보기
                    </Link>
                  </div>
                </div>
              </li>

              <li>
                <Link href="/community/post" className="block font-bold py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  자유시장
                </Link>
              </li>
              <li>
                <Link href="/community" onClick={() => setIsMobileMenuOpen(false)} className="block font-bold py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  핫딜
                </Link>
              </li>
            
              {isMobileMenuOpen && (
                <div className="block md:hidden px-0 pb-0">
                  <div className="p-0 bg-white dark:bg-gray-900 space-y-4">
                    {/* 🔍 검색창 */}
                    <form onSubmit={handleSearch}>
                      <div className="relative">
                        <input
                          type="search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white
                            focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                          placeholder="검색어를 입력하세요"
                        />
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                          </svg>
                        </div>
                      </div>
                    </form>

                    {/* ❤️ 🛒 👤 아이콘들 */}
                    <div className="flex items-center justify-start gap-4">
                      <AuthStatusIcon />
                      <Link href="/main/wishlist" onClick={() => setIsMobileMenuOpen(false)}>
                        <HeartIcon className="w-7 h-7 text-gray-700 dark:text-white hover:text-red-600" />
                      </Link>
                      <Link href="/main/cart" onClick={() => setIsMobileMenuOpen(false)}>
                        <ShoppingCartIcon className="w-7 h-7 text-gray-700 dark:text-white hover:text-red-600" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

            </ul>
          </div>
          {/* 모바일 메뉴 버튼 */}
          <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden 
                        hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 
                        dark:hover:bg-gray-700 dark:focus:ring-gray-600 ml-auto"
              aria-controls="navbar-dropdown"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          
          {/* ✅ 검색창 */}
          <form onSubmit={handleSearch} className="hidden md:block max-w-md ml-auto relative top-10">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input 
                type="search" 
                id="default-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // ✅ 상태 업데이트
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                          focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 
                          dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                placeholder="Search..."
              />
            </div>
          </form>

            <Link href="/main/wishlist" className="hidden md:block ml-10 relative top-10">
              <HeartIcon className="w-8 h-8 text-gray-700 dark:text-white cursor-pointer hover:text-red-700 dark:hover:text-red-500" />
            </Link>

            <Link href="/main/cart" className="hidden md:block ml-4 relative top-10">
              <ShoppingCartIcon className="w-8 h-8 text-gray-700 dark:text-white cursor-pointer hover:text-red-700 dark:hover:text-red-500" />
            </Link>

            <div className="hidden md:block ml-4 relative top-11">
              <AuthStatusIcon/>
            </div>

        </div>

        <hr className="border-gray-200 dark:border-gray-700" />
        </nav>
  );
}