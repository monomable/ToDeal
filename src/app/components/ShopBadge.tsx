// components/ShopBadge.tsx
import React from "react";

interface ShopBadgeProps {
  shop: string;
}

const getShopInfo = (shop: string) => {
  switch (shop.toLowerCase()) {
    case "coupang":
      return { label: "쿠팡", style: "bg-blue-500 text-white" };
    case "kurly":
      return { label: "마켓컬리", style: "bg-purple-500 text-white" };
    case "emartmall":
      return { label: "이마트몰", style: "bg-yellow-300 text-black" };
    case "gmarket":
      return { label: "지마켓", style: "bg-green-500 text-white" };
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
