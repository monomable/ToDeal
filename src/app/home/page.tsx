import Link from "next/link";
import TableData from "@/src/app/ui/home/list/tabledata";
import { Suspense } from "react";
import { Spinner } from "@/src/app/ui/home/list/spinner";
import "../globals.css";

export default function Page() {
    return (
    <div className="">
      <div className="flex items-center justify-between gap-1 mb-4">
        <h1 className="text-4xl font-bold">메인메뉴</h1>
      </div>    
        <div className="">
          <div className="mb-2 w-full text-right">
            <Link href="/post/create" // 버튼 링크 연결
              className="white-btn">
              글쓰기
            </Link>
          </div>
          <Suspense fallback={<Spinner />}>
            <TableData/>
          </Suspense>
      </div>  
    </div>
    );
  }