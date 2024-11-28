"use client";
   
import React, { useEffect, useState } from "react";
import axios from 'axios' // https 비동기 통신 라이브러리
import Link from "next/link";
import WebTag from "@/ui/home/list/webtag";

interface Table {
    id: number;
    _id: number;
    board_id: string;
    title: string;
    link: string;
    category: string;
    price: string;
    image_base64: string;
    source_website: string;
}

const SearchList = ({query} : {query: string}) => {
    const [userData, setUSerData] = useState<Table[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);  // 데이터 요청 전에 로딩 시작
                const result = await axios(process.env.NEXT_PUBLIC_BASE_URL+"/api/search?query="+query);
                console.log(result.data);
                setUSerData(result.data);
                setLoading(false);
            } catch (err) {
                console.log("somthing Wrong");
                setLoading(false);
            }
        }

        fetchData();
    }, [query]);


    return (
        <div>
            {loading ? (
                <div className="w-full flex justify-center py-4">
                    <div className="loader">로딩 중...</div> {/* CSS로 로딩바 스타일을 추가할 수 있음 */}
                </div>
            ) : (
            <table className="table table-zebra max-w-screen-md mx-2">
            <thead className="text-sm text-gray-700 uppercase bg-gray-100">
                <tr>
                    <th className="py-3 text-xs md:px-0 md:w-56 md:text-sm">이미지</th>
                    <th className="py-3 text-xs px-24 md:px-4 md:w-[560px] md:text-sm">제목</th>
                </tr>
            </thead>
            <tbody>
                {userData.map((rs, index) => (
                    <tr key={rs.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="md:py-3 md:px-6">
                            <a className="block aspect-square w-full relative" href={rs.link} rel="noopener noreferrer" target="_blank">
                                <img 
                                    className="inset-0 w-full h-full object-cover rounded-lg cursor-pointer border-[1px]"
                                    src={`data:image/jpeg;base64,${rs.image_base64}`}
                                    alt={`핫딜 이미지 ${index + 1}`}
                                />
                            </a>
                        </td>
                        <td className="py-3 px-6">
                            <a className="block" href={rs.link} rel="noopener noreferrer" target="_blank">
                                {WebTag(rs.source_website)}<br/>
                                {rs.title} <br/>
                                <div className="text-red-700">{rs.price}</div>
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
            )}
        </div>
  );
}

export default SearchList