"use client";
   
import React, { useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import axios from 'axios' // https 비동기 통신 라이브러리
import Link from "next/link";
import "../../../globals.css"

const images = [
  "/todeal-logo.png",
  "/test1.webp",
  "/test2.webp"
];

interface post {
  id : number;
  _id : number;
  board_id : string
  writer : string
  title : string
  content : string
  regdate : string
}

type Props = {
    params: {
      id: string;
    }
  }
  
  export default function Post({params}: Props) {

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(2);
  const [selectedColor, setSelectedColor] = useState("red");
  const [selectedSize, setSelectedSize] = useState("M");

  const sizes = ["XS", "S", "M", "L", "XL"];

    const [userData, setUSerData] = useState<post[]>([]);

    useEffect(() => {
      fetchData();
    }, [])

    const fetchData = async () => {
      try {
            const result = await axios(process.env.NEXT_PUBLIC_BASE_URL+"/api/post/edit/"+params.id); // 추후 edit 에서 view 로 바꿔야함
            console.log(result.data);
            setUSerData(result.data);
      } 
      catch (err) {
            console.log("somthing Wrong");
      }
    }

    //var postTime = elapsedTime(userData.regdate)

    return (
      <div className="flex flex-col md:flex-row gap-8 p-8 max-w-6xl mx-auto">
        {/* Left: Images */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                className="w-20 h-20 object-cover rounded border cursor-pointer hover:border-red-500"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={selectedImage}
              alt="selected"
              className="w-full aspect-square object-contain bg-gray-100 rounded"
            />
          </div>
        </div>
  
        {/* Right: Info */}
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">Havic HV G-92 Gamepad</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-yellow-400">★★★★★</span>
              <span className="text-sm text-gray-500">(150개 리뷰)</span>
              <span className="text-green-600 text-sm font-medium ml-2">재고 있음</span>
            </div>
          </div>
  
          <div className="text-2xl font-semibold">$192.00</div>
  
          <p className="text-sm text-gray-600">
            PlayStation 5 Controller Skin High quality vinyl with air channel
            adhesive for easy bubble free install & mess free removal Pressure
            sensitive.
          </p>
  
          <div className="space-y-4">
            {/* 색상 */}
            <div>
              <div className="text-sm font-medium mb-1">색상:</div>
              <div className="flex gap-3">
                <button
                  className={`w-6 h-6 rounded-full border border-gray-300 ${
                    selectedColor === "red" ? "ring-2 ring-red-500" : ""
                  } bg-red-500`}
                  onClick={() => setSelectedColor("red")}
                ></button>
                <button
                  className={`w-6 h-6 rounded-full border border-gray-300 ${
                    selectedColor === "gray" ? "ring-2 ring-red-500" : ""
                  } bg-gray-500`}
                  onClick={() => setSelectedColor("gray")}
                ></button>
              </div>
            </div>
  
            {/* 사이즈 */}
            <div>
              <div className="text-sm font-medium mb-1">사이즈:</div>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded text-sm ${
                      selectedSize === size
                        ? "bg-red-500 text-white"
                        : "bg-white text-gray-800 border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
  
            {/* 수량 + 구매 버튼 */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <div className="px-4 text-sm">{quantity}</div>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
              <button className="bg-red-500 text-white px-6 py-3 rounded text-sm hover:bg-red-600">
                지금 구매
              </button>
            </div>
  
            {/* 배송 & 반품 */}
            <div className="space-y-2 text-sm text-gray-700 mt-6">
              <div className="flex items-start gap-3">
                <span className="text-xl">🚚</span>
                <span>
                  <strong className="text-black">무료 배송</strong>
                  <br />
                  오후 2시 전에 주문하면 당일 발송 가능 여부 확인
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">🔄</span>
                <span>
                  <strong className="text-black">반품</strong>
                  <br />
                  30일 무료 반품. <a href="#" className="underline">자세히 보기</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  