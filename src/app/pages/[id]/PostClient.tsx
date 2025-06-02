'use client';

import React, { useEffect, useState } from "react";
import axios from 'axios';
import Link from "next/link";

interface post {
  id: number;
  _id: number;
  board_id: string;
  writer: string;
  title: string;
  content: string;
  regdate: string;
}

export default function PostClient({ id }: { id: string }) {
  const [userData, setUserData] = useState<post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/server-api/posts/${id}`;
        console.log("✅ 요청 URL:", url); // 확인용 로그
        const result = await axios(url);
        setUserData(result.data);
      } catch (err) {
        console.log("❌ something went wrong", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="p-4">로딩 중...</div>;
  if (!userData) return <div className="p-4 text-red-500">게시글을 찾을 수 없습니다.</div>;

  return (
    <div key={userData.board_id} className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 max-w-2xl mx-auto mt-10">
        {/* 제목 */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {userData.title}
        </h1>

        {/* 작성자 / 날짜 */}
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span>작성자: {userData.writer}</span>
            <span>{userData.regdate.split("T")[0]}</span>
        </div>

        {/* 본문 */}
        <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-100 text-base leading-relaxed mb-6">
            {userData.content}
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-3">
            <Link href={`/post/edit/${id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition" >
            수정
            </Link>
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/delete/${id}`} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition">
            삭제
            </Link>
        </div>
    </div>

  );
}
