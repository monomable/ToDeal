'use client';

import Link from "next/link";
import TableData from "@/ui/home/list/tabledata";
import { Suspense } from "react";
import { Spinner } from "@/ui/home/list/spinner";
import { useEffect, useState } from "react";
import FlashSaleHeader from "../components/FlashSaleHeader"
import FlashSaleProducts from "../components/FlashSaleProducts"
import "../globals.css";

interface HotDeal {
  image_base64: string;
  link: string;
}

export default function Page() {
  const [images, setImages] = useState<HotDeal[]>([]);

  useEffect(() => {
    fetch('/api/images')
      .then(res => res.json())
      .then(data => {
        setImages(data);
      });
  }, []);

    return (
      <div className="">
        <div className="w-full">
          <FlashSaleHeader/>
        </div>

        <FlashSaleProducts/>


      </div>
    );
  }