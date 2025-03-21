export default function FlashSaleHeader() {
    return (
    <div className="space-y-10">
        <div className="flex items-center space-x-4">
            {/* 왼쪽 빨간색 바 */}
            <div className="w-5 h-10 bg-red-500 rounded"></div>
            
            {/* 텍스트 */}
            <span className="text-red-500 font-bold text-lg">카테고리</span>
        </div>
        <h1 className="text-3xl font-bold mt-2">Browse By Categories</h1>
    </div>
    );
  }