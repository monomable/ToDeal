'use client';

import React from 'react';

interface UnitPriceInfoProps {
  product_name: string;
  product_price: number;
}

const UNIT_CONVERSIONS: Record<string, number> = {
  kg: 1000,
  g: 1,
  l: 1000,
  ml: 1,
};

const QUANTITY_UNITS = ['팩', '개', '개입', '입', '포', '박스', '캔', '병'];

function extractUnitInfo(title: string) {
  let totalWeightInG = 0;
  let totalQuantity = 1; // 기본 1로 설정 (묶음 없을 경우)

  const regex = /([\d,.]+)(~|-)?([\d,.]+)?\s?(kg|g|ml|l)(?:\s*x\s*(\d+))?/gi;
  let match;

  while ((match = regex.exec(title)) !== null) {
    const min = parseFloat(match[1].replace(',', ''));
    const max = match[3] ? parseFloat(match[3].replace(',', '')) : null;
    const avg = max ? (min + max) / 2 : min;
    const unit = match[4].toLowerCase();
    const count = match[5] ? parseInt(match[5], 10) : 1;

    const weight = avg * (UNIT_CONVERSIONS[unit] ?? 1);
    totalWeightInG += weight * count;
  }

  // 수량 단위 (예: 10팩, 3개입 등)
  const qtyMatch = title.match(new RegExp(`(\\d+)(?:\\s*)(${QUANTITY_UNITS.join('|')})`));
  if (qtyMatch) {
    totalQuantity = parseInt(qtyMatch[1], 10);
  }

  return {
    totalWeightInG: totalWeightInG || undefined,
    totalQuantity: totalQuantity || undefined,
  };
}

function formatUnitPrice(product_name: string, product_price: number): string | null {
  const { totalWeightInG, totalQuantity } = extractUnitInfo(product_name);
  const results: string[] = [];

  if (totalQuantity && totalQuantity > 1) {
    const perUnit = Math.round(product_price / totalQuantity).toLocaleString();
    results.push(`1개당 ${perUnit}원`);
  }

  if (totalWeightInG && totalWeightInG > 0) {
    const per100g = Math.round((product_price / totalWeightInG) * 100);
    results.push(`100g당 ${per100g.toLocaleString()}원`);
  }

  return results.length ? results.join(', ') : null;
}

const UnitPriceInfo: React.FC<UnitPriceInfoProps> = ({ product_name, product_price }) => {
  const text = formatUnitPrice(product_name, product_price);
  if (!text) return null;

  return <p className="text-sm text-gray-500">{text}</p>;
};

export default UnitPriceInfo;
