'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // ✅ Link 추가

interface Post {
  board_id: number;
  writer: string;
  title: string;
  content: string;
  regdate: string;
  update: string | null;
}

interface Props {
  currentPage: number;
  onTotalPagesChange: (total: number) => void;
}

export default function PostData({ currentPage, onTotalPagesChange }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/server-api/posts?page=${currentPage}`);
        if (!res.ok) throw new Error('게시글을 불러올 수 없습니다.');

        const data = await res.json();
        console.log('✅ 서버 응답 데이터:', data);

        if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          console.warn('❗ posts가 배열이 아닙니다:', data.posts);
          setPosts([]);
        }

        if (typeof onTotalPagesChange === 'function') {
          onTotalPagesChange(data.totalPages || 0);
        }
      } catch (err) {
        console.error('❌ fetch 실패:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, onTotalPagesChange]);

  if (loading) return <div className="mt-4 text-gray-500">로딩 중...</div>;
  if (error) return <div className="mt-4 text-red-500">{error}</div>;
  if (posts.length === 0) return <div className="mt-4 text-gray-500">표시할 게시글이 없습니다.</div>;

  return (
    <div className="mt-4 space-y-4">
      {/* 글쓰기 버튼 */}
      <div className="text-right mb-4">
        <Link href="/post/create">
          <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">
            글쓰기
          </button>
        </Link>
      </div>

      {posts.map((post) => (
        <div
          key={post.board_id}
          onClick={() => router.push(`/pages/${post.board_id}`)}
          className="border p-4 rounded shadow-sm bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{post.title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">작성자: {post.writer}</p>
          <p className="text-sm mt-2 text-gray-800 dark:text-gray-100 line-clamp-2">{post.content}</p>
          <p className="text-xs text-gray-400 mt-1">
            등록일: {new Date(post.regdate).toLocaleString('ko-KR')}
            {post.update && <> / 수정일: {new Date(post.update).toLocaleString('ko-KR')}</>}
          </p>
        </div>
      ))}
    </div>
  );
}