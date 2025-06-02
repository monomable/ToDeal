"use client";
   
import React, { useEffect, useState } from "react";
import axios from 'axios' // https 비동기 통신 라이브러리
import Link from "next/link";

interface table {
    id : number;
    _id : number;
    board_id : string
    writer : string
    title : string
    content : string
}

interface PostMainDataProps {
    currentPage: number;
    onTotalPagesChange: (total: number) => void;
}
 
export default function Users({ currentPage, onTotalPagesChange }: PostMainDataProps) {
    const [userData, setUSerData] = useState<table[]>([]);
    const [setTotalPages] = useState(0);
    const itemsPerPage = 15;

    useEffect(() => {
        fetchData();
    }, [currentPage])
  
    const fetchData = async () => {
        try {
            const result = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/list?page=${currentPage}&limit=${itemsPerPage}`);
            setUSerData(result.data.items);
            const total = Math.ceil(result.data.total / itemsPerPage);
            setTotalPages(total);
            onTotalPagesChange(total);
        } catch (err) {
            console.log("에러 발생:", err);
        }
    }

    // userData가 없을 때 로딩 표시
    if (!userData) {
        return <div>로딩 중...</div>;
    }
    
    return (
        <table className="table table-zebra max-w-[730px] border-[1px]">
            <thead className="text-sm text-gray-700 uppercase bg-gray-100">
            </thead>
            
            {userData.map((rs, index) => (
                <tbody key={rs.board_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <tr className="" onClick={() => window.open(`/post/view/${rs.board_id}`, '_self')}>
                        <td className="py-3 px-6 font-bold">
                            <Link className="block" href={`/post/view/${rs.board_id}`}>{rs.title}</Link>
                        </td>
                        <td className="py-3 px-6 text-sm md:w-80 justify-items-end text-right">
                            <Link className="block" href={`/post/view/${rs.board_id}`}>{rs.writer} : 작성자</Link>
                        </td>
                    </tr>
                    <tr className="" onClick={() => window.open(`/post/view/${rs.board_id}`, '_self')}>
                        <td colSpan={2} className="py-3 px-6 w-[730px]">
                            <Link className="block" href={`/post/view/${rs.board_id}`}>{rs.content}</Link>
                        </td>
                    </tr>
                </tbody>
            ))}
        </table>
    );
}