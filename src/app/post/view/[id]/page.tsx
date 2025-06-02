// src/app/post/view/[id]/page.tsx
import ProductPageClient from '@/components/ProductPageClient';
import axios from 'axios';

export default async function ProductPage({ params }: { params: any }) {
  const { id } = await params; // ✅ 이 방식이 공식 권장 방식
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/server-api/products/${id}`);
  const product = res.data;

  return <ProductPageClient product={product} />;
}