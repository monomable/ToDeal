// app/categories/[category]/page.tsx
import ProductClient from '@/components/ProductClient';

export const dynamicParams = true;

export default function CategoryProductsPage({ params }: { params: { category: string } }) {
  return <ProductClient category={params.category} />;
}
