import { useState } from "react";
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

// 더미 데이터 (1개월 기준)
const priceData = [
  { date: "02.23", price: 62000 },
  { date: "03.01", price: 63760 },
  { date: "03.10", price: 66000 },
  { date: "03.15", price: 69000 },
  { date: "현재", price: 69000 },
];

const avgPrice = 63760;

const ranges = ["1개월", "3개월", "6개월", "12개월"];

export default function PriceTrendChart() {
  const [activeRange, setActiveRange] = useState("1개월");

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
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={priceData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f1f1" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis hide domain={['dataMin - 2000', 'dataMax + 2000']} />
          <Tooltip
            formatter={(value) => [`₩${value.toLocaleString()}`, '가격']}
            labelFormatter={(label) => `${label}`}
          />
          {/* 평균가 라인 */}
          <ReferenceLine y={avgPrice} stroke="#94a3b8" strokeDasharray="3 3">
            <Label value="평균가" position="insideLeft" fill="#94a3b8" fontSize={12} />
          </ReferenceLine>
          {/* 가격 선 */}
          <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-xs text-center text-gray-400 mt-2">최근 1개월간 가격 변화</p>
    </div>
  );
}
