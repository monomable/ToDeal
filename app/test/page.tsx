import Image from "next/image";

export default function Home() {
  return (
    <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
      이 텍스트는 화면 크기에 따라 크기가 변경됩니다.
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        패딩 크기는 화면 크기에 따라 조절됩니다.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>아이템 1</div>
        <div>아이템 2</div>
        <div>아이템 3</div>
      </div>
    </div>
  );
}
