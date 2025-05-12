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
    <div>
      <CategorySelector/>
      <h1>카테고리</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        {categories.map((cat) => (
          <div key={cat.name}
               style={{ border: '1px solid #ccc', padding: '20px', cursor: 'pointer' }}
               onClick={() => handleClick(cat.name)}>
            <div style={{ fontSize: '40px' }}>{cat.icon}</div>
            <div>{cat.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
