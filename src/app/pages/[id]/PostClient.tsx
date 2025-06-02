'use client';

import React, { useEffect, useState } from "react";
import axios from 'axios';
import Link from "next/link";
import { useRouter } from "next/navigation";

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

  const [showModal, setShowModal] = useState<null | 'edit' | 'delete'>(null);
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/server-api/posts/${id}`;
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

  const closeModal = () => {
    setShowModal(null);
    setPassword("");
  };

  const handleConfirm = async () => {
    if (!password) return alert("비밀번호를 입력해주세요.");

    try {
      // ✅ 1. 비밀번호 검증 요청
      const verifyRes = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/server-api/posts/${id}/verify-password`,
        { password }
      );

      if (!verifyRes.data.success) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      if (showModal === "edit") {
        router.push(`/post/edit/${id}`);
      } 

      else if (showModal === "delete") {
        // ✅ 2. 삭제 요청
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/server-api/posts/${id}`);
        alert("게시글이 삭제되었습니다.");
        router.push("/community/post");
      }

    } catch (error) {
      console.error("❌ 삭제 실패:", error);
      alert("처리 중 오류가 발생했습니다.");
    } finally {
      closeModal();
    }
  };

  if (loading) return <div className="p-4">로딩 중...</div>;
  if (!userData) return <div className="p-4 text-red-500">게시글을 찾을 수 없습니다.</div>;

  return (
    <>
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
          <button
            onClick={() => router.push(`/post/edit/${id}`)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
          >
            수정
          </button>
          <button
            onClick={() => setShowModal("delete")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            삭제
          </button>
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              비밀번호 확인
            </h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
              placeholder="비밀번호 입력"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                취소
              </button>
              <button
                onClick={handleConfirm}
                className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
