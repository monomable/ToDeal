// src/app/pages/[id]/page.tsx

import PostClient from './PostClient';

interface Props {
  params: { id: string };
}

export default function Page({ params }: Props) {
  // ✅ 반드시 id를 넘겨야 클라이언트에서 undefined가 되지 않음
  return <PostClient id={params.id} />;
}
