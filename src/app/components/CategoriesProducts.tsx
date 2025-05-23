'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LeafIcon, CoffeeIcon, AppleLogoIcon, EggIcon, BreadIcon, BarbellIcon} from "@phosphor-icons/react";
import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

interface Category {
  id: number;
  name: string;
  slug: string; // 영문 URL용
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string; titleId?: string } & RefAttributes<SVGSVGElement>
  >;
}

interface CategorySelectorProps {
  categories?: Category[];
}

const defaultCategories: Category[] = [
  { id: 1, name: "야채", slug: "vagetables", icon: LeafIcon },
  { id: 2, name: "과일ㆍ견과류ㆍ곡물", slug: "NutandRise", icon: AppleLogoIcon },
  { id: 3, name: "육류ㆍ닭걀", slug: "meetNegg", icon: EggIcon },
  { id: 4, name: "커피ㆍ차", slug:"coffeNtea", icon: CoffeeIcon },
  { id: 5, name: "베이커리", slug:"bakery", icon: BreadIcon },
  { id: 6, name: "건강", slug:"healthy", icon: BarbellIcon },
];

export default function CategorySelector({ categories = defaultCategories }: CategorySelectorProps) {
  const [selected, setSelected] = useState(0);
  const router = useRouter();

  const handleClick = (id: number, slug: string) => {
    setSelected(id);
    router.push(`/categories/${slug}`);
  };

  return (
    <div className="grid grid-cols-6 gap-4 w-full mx-auto">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selected === category.id;

        return (
          <div
            key={category.id}
            className={`aspect-square flex flex-col items-center justify-center border rounded-md cursor-pointer transition ${
              isSelected ? "bg-red-500 text-white" : "bg-white text-black border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => handleClick(category.id, category.slug)}
          >
            <Icon className={`w-8 h-8 ${isSelected ? "text-white" : "text-black"}`} />
            <span className="mt-2 text-sm font-medium">{category.name}</span>
          </div>
        );
      })}
    </div>
  );

}
