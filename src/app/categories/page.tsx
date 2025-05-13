// categories/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import CategorySelector from '@/components/CategoriesProducts';

const categories = [
  { name: 'Phones', icon: '📱' },
  { name: 'Computers', icon: '💻' },
  { name: 'SmartWatch', icon: '⌚' },
  { name: 'Camera', icon: '📷' },
  { name: 'HeadPhones', icon: '🎧' },
  { name: 'Gaming', icon: '🎮' },
];

export default function CategoriesPage() {
  const router = useRouter();

  const handleClick = (category: string) => {
    router.push(`/categories/${category}`);
  };

  return (
    <div className='mt-5 space-y-5'>
      <CategorySelector/>
      <CategorySelector/>
    </div>
  );
}
