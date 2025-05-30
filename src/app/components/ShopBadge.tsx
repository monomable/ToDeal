// components/ShopBadge.tsx
import React from "react";

interface ShopBadgeProps {
  shop: string;
}

const getShopInfo = (shop: string) => {
  switch (shop.toLowerCase()) {
    case "Coupang":
      return { label: "쿠팡", style: "bg-blue-500 text-white" };
    case "kurly":
      return { label: "마켓컬리", style: "bg-purple-500 text-white" };
    case "Emart":
      return { label: "이마트", style: "bg-yellow-300 text-black" };
    case "Gmarket":
      return { label: "롯데온", style: "bg-red-500 text-white" };
    default:
      return { label: shop, style: "bg-gray-200 text-gray-700" };
  }
};

export default function ShopBadge({ shop }: ShopBadgeProps) {
  const { label, style } = getShopInfo(shop);

  return (
    <span
      className={`inline-block text-sm px-3 py-1 rounded-full font-medium ${style}`}
    >
      {label}
    </span>
  );
}
