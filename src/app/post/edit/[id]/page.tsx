'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
  board_id: string;
  writer: string;
  title: string;
  content: string;
  regdate: string;
}

export default function EditPage() {
  const { id } = useParams() as { id: string };
  const [post, setPost] = useState<Post | null>(null);
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const verifyPassword = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/server-api/posts/${id}/verify-password`, {
        password,
      });
      if (res.data.success) {
        const postRes = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/server-api/posts/${id}`);
        setPost(postRes.data);
        setShowModal(false);
      } else {
        setError('비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      setError('서버 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/server-api/posts/${id}/edit`, {
        title: post.title,
        writer: post.writer,
        content: post.content,
        password,
      });
      alert('수정 완료');
      router.push(`/pages/${id}`);
    } catch {
      alert('수정 실패');
    }
  };

  const handleCancel = () => {
    router.push(`/pages/${id}`);
  };

  const handleChange = (field: keyof Post, value: string) => {
    setPost((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  return (
    <>
      {/* 비밀번호 확인 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">비밀번호 확인</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
              placeholder="비밀번호 입력"
            />
            {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="px-3 py-1 rounded bg-gray-400 hover:bg-gray-500 text-white"
              >
                취소
              </button>
              <button
                onClick={verifyPassword}
                className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 게시글 수정 폼 */}
      {!showModal && post && (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg mt-10">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">게시글 수정</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              defaultValue={post.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white"
            />
            <textarea
              defaultValue={post.writer}
              onChange={(e) => handleChange('writer', e.target.value)}
              className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white"
            />
            <textarea
              defaultValue={post.content}
              onChange={(e) => handleChange('content', e.target.value)}
              className="w-full border rounded p-2 h-40 resize-none dark:bg-gray-700 dark:text-white"
            />
            <input type="hidden" value={password} />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                취소
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                수정 완료
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
