import { Suspense } from 'react';
import SearchClient from './SearchClient'; // ✅ 그냥 import

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-4">🔍 검색 페이지 로딩 중...</div>}>
      <SearchClient />
    </Suspense>
  );
}