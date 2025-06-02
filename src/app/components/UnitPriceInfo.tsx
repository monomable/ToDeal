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

const QUANTITY_UNITS = ['팩', '개', '개입', '입', '포', '박스', '캔', '병', '정', '캡슐'];

function extractUnitInfo(title: string) {
  let totalWeightG = 0;
  let totalQuantity = 0;
  let quantityUnitUsed = '';
  let weightUnitForDisplay = 'g';
  let quantityUnitFound = false;

  const weightRegex = /([\d,.]+)(?:\s*[xX×]\s*(\d+))?\s*(kg|g|ml|l)/gi;
  const weightMatches = [...title.matchAll(weightRegex)];
  for (const match of weightMatches) {
    const base = parseFloat(match[1].replace(/,/g, ''));
    const count = match[2] ? parseInt(match[2], 10) : 1;
    const unit = match[3].toLowerCase();
    const inGrams = base * (UNIT_CONVERSIONS[unit] || 1);
    totalWeightG += inGrams * count;
    if (unit === 'ml' || unit === 'l') weightUnitForDisplay = 'ml';
  }

  const quantityRegex = new RegExp(`(\\d+)\\s*(${QUANTITY_UNITS.join('|')})`, 'gi');
  const quantityMatches = [...title.matchAll(quantityRegex)];
  for (const match of quantityMatches) {
    totalQuantity += parseInt(match[1], 10);
    if (!quantityUnitUsed) quantityUnitUsed = match[2];
    quantityUnitFound = true;
  }

  return {
    totalWeightG: totalWeightG || undefined,
    totalQuantity: totalQuantity || undefined,
    quantityUnitUsed: quantityUnitUsed || undefined,
    weightUnitForDisplay,
    quantityUnitFound,
  };
}

function formatUnitPrice(product_name: string, product_price: number): string | null {
  const { totalWeightG, totalQuantity, quantityUnitUsed, weightUnitForDisplay, quantityUnitFound } = extractUnitInfo(product_name);
  const results: string[] = [];

  // 예외 단위가 있으면 무게 단가는 생략
  if (totalQuantity && quantityUnitUsed) {
    const perUnit = Math.round(product_price / totalQuantity).toLocaleString();
    results.push(`1${quantityUnitUsed}당 ${perUnit}원`);
  }

  if (!quantityUnitFound && totalWeightG && totalWeightG > 0) {
    let base = 1000;
    let label = '';

    if (totalWeightG <= 100) {
      base = 10;
      label = weightUnitForDisplay === 'ml' ? '10ml당' : '10g당';
    } else if (totalWeightG <= 1000) {
      base = 100;
      label = weightUnitForDisplay === 'ml' ? '100ml당' : '100g당';
    } else {
      base = 1000;
      label = weightUnitForDisplay === 'ml' ? '1L당' : '1kg당';
    }

    const perWeight = Math.round((product_price / totalWeightG) * base).toLocaleString();
    results.push(`${label} ${perWeight}원`);
  }

  return results.length ? results.join(', ') : null;
}

const UnitPriceInfo: React.FC<UnitPriceInfoProps> = ({ product_name, product_price }) => {
  const text = formatUnitPrice(product_name, product_price);
  if (!text) return null;

  return <p className="text-sm text-gray-500">{text}</p>;
};

export default UnitPriceInfo;
