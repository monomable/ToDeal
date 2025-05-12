'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  CameraIcon, 
  DeviceTabletIcon, 
  ComputerDesktopIcon, 
  ClockIcon, 
  MusicalNoteIcon, 
  WalletIcon 
} from "@heroicons/react/24/outline";

const categories = [
  { id: 1, name: "Phones", icon: DeviceTabletIcon },
  { id: 2, name: "Computers", icon: ComputerDesktopIcon },
  { id: 3, name: "SmartWatch", icon: ClockIcon },
  { id: 4, name: "Camera", icon: CameraIcon },
  { id: 5, name: "HeadPhones", icon: MusicalNoteIcon },
  { id: 6, name: "Gaming", icon: WalletIcon },
];

export default function CategorySelector() {
  const [selected, setSelected] = useState(0);  // 선택된 카테고리
  const router = useRouter();

  const handleClick = (id: number, name: string) => {
    setSelected(id);
    router.push(`/categories/${name}`);
  };

  return (
    <div className="flex justify-center space-x-4">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selected === category.id;

        return (
          <div
            key={category.id}
            className={`w-full aspect-square flex flex-col items-center justify-center border rounded-md cursor-pointer transition ${
              isSelected ? "bg-red-500 text-white" : "bg-white text-black border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => handleClick(category.id, category.name)}
          >
            <Icon className={`w-8 h-8 ${isSelected ? "text-white" : "text-black"}`} />
            <span className="mt-2 text-sm font-medium">{category.name}</span>
          </div>
        );
      })}
    </div>
  );
}
