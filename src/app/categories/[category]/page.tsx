// src/app/categories/[category]/page.tsx
import ProductClient from '../../components/ProductClient'; // 아래 단계에서 만들 파일
import { notFound } from 'next/navigation';

interface Product {
  id: number;
  product_name: string;
  product_price: number;
  shop_info: string;
  category: string;
  product_link: string;
  created_at: string;
  updated_at: string;
  filename: string;
}

async function getProducts(category: string): Promise<Product[]> {
  const res = await fetch(`http://localhost:5000/server-api/products?category=${category}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export default async function CategoryProductsPage({ params }: { params: { category: string } }) {
  const products = await getProducts(params.category).catch(() => notFound());

  return <ProductClient products={products} />;
}
