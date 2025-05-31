// categories/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import CategorySelector from '@/components/CategoriesProducts';
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { BeerBottleIcon, CookieIcon, JarLabelIcon, CookingPotIcon ,FishIcon } from "@phosphor-icons/react";

const customCategories = [
  { id: 2, name: "과자", slug:"snack", icon: CookieIcon },
  { id: 3, name: "조미료", slug:"seasoning", icon: JarLabelIcon },
  { id: 4, name: "밀키트", slug:"ready meal", icon: CookingPotIcon },
  { id: 5, name: "해산물", slug:"seafood", icon: FishIcon },
  { id: 6, name: "로켓", slug:"rocket", icon: RocketLaunchIcon }
];

export default function CategoriesPage() {
  const router = useRouter();

  const handleClick = (category: string) => {
    router.push(`/categories/${category}`);
  };

  return (
    <div className='mt-5 space-y-5'>
      <CategorySelector/>
      <CategorySelector categories={customCategories} />
    </div>
  );
}
