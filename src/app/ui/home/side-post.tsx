"use client"

import Link from "next/link";
import PostData from "@/ui/home/list/postdata"
import { Spinner } from "./list/spinner";
import { Suspense } from "react";
import { usePathname } from "next/navigation";

export default function SidePost() {

    const pathname = usePathname();

    return pathname === "/home/post" ? (<p></p>) : (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h4 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">실시간 의견</h4>

            <div className="">
                <Suspense fallback={<Spinner />}>
                    <PostData/>
                </Suspense>
            </div>  
        </div>
    );
}
  