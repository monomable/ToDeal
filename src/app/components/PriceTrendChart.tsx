'use client';

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from "recharts";

const ranges = ["1개월", "3개월", "6개월", "12개월"];

export default function PriceTrendChart({ productLink }: { productLink: string }) {
  const [activeRange, setActiveRange] = useState("1개월");
  const [priceData, setPriceData] = useState<{ date: string; price: number }[]>([]);
  const [avgPrice, setAvgPrice] = useState<number>(0);

useEffect(() => {
  const fetchChartData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/server-api/products/trend?product_link=${encodeURIComponent(productLink)}`);
      const data = await res.json();
      console.log("📦 서버 응답:", data);

      // 안전하게 구조 확인
      if (data?.priceData && Array.isArray(data.priceData)) {
        setPriceData(data.priceData);
        setAvgPrice(data.avgPrice || 0);
      } else {
        console.warn("❗ 예상치 못한 응답 구조", data);
        setPriceData([]);
      }
    } catch (error) {
      console.error("❌ fetchChartData error:", error);
      setPriceData([]);
    }
  };

  fetchChartData();
}, [productLink]);

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <h3 className="text-sm font-semibold mb-4">최저가 추이</h3>

      {/* 범위 선택 */}
      <div className="flex gap-4 mb-2 text-sm">
        {ranges.map((range) => (
          <button
            key={range}
            onClick={() => setActiveRange(range)}
            className={`px-3 py-1 rounded-full border ${
              activeRange === range
                ? "bg-blue-100 text-blue-600 border-blue-300"
                : "text-gray-500 border-transparent hover:bg-gray-100"
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* 그래프 영역 */}
      {Array.isArray(priceData) && priceData.length > 0 ? (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={priceData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f1f1" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis hide domain={['dataMin - 2000', 'dataMax + 2000']} />
            <Tooltip
              formatter={(value) => [`₩${value.toLocaleString()}`, '가격']}
              labelFormatter={(label) => `${label}`}
            />
            <ReferenceLine y={avgPrice} stroke="#94a3b8" strokeDasharray="3 3">
              <Label value="평균가" position="insideLeft" fill="#94a3b8" fontSize={12} />
            </ReferenceLine>
            <Line
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[200px] flex items-center justify-center text-gray-400 text-sm">
          가격 추이 데이터 부족
        </div>
      )}

      <p className="text-xs text-center text-gray-400 mt-2">최근 {activeRange}간 가격 변화</p>
    </div>
  );
}
