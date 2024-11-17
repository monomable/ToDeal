"use client";

import Image from 'next/image'
import React, { useEffect, useState } from "react";
import axios from 'axios'
import Link from 'next/link';

interface table {
    id : number;
    _id : number;
    board_id : string
    title : string
    content : string
}

const SearchList = async ({query} : {query: string}) => {
    const [userData, setUSerData] = useState<table[]>([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const result = await axios(process.env.NEXT_PUBLIC_BASE_URL+"/api/search?query="+query);
            console.log(result.data);
            setUSerData(result.data);
        } catch (err) {
            console.log("somthing Wrong");
        }
    }


    return (
        <table className="table table-zebra">
        <thead className="text-sm text-gray-700 uppercase bg-gray-100">
            <tr>
            <th className="py-3 px-6">게시글ID</th>
            <th className="py-3 px-64">제목</th>
            {/* <th className="py-3 px-6">내용</th> */}
            {/* <th className="py-3 px-6 text-center">액션</th> */}
            </tr>
        </thead>
        <tbody>
            {userData.map((rs, index) => (
            <tr key={rs.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="py-3 px-6">
                    <Link className="block" href={`/post/view/${rs.board_id}`}>{rs.board_id}</Link>
                </td>
                <td className="py-3 px-6">
                    <Link className="block" href={`/post/view/${rs.board_id}`}>{rs.title}</Link>
                </td>
                
                {/* <td className="py-3 px-6">{rs.content}</td> 
                <td className="flex justify-center gap-1 py-3">
                    <Link href={`/post/view/${rs.board_id}`} className="btn btn-info">
                    조회
                    </Link>
                    <Link href={`/post/edit/${rs.board_id}`} className="btn btn-primary">
                    수정
                    </Link>
                    <button onClick={()=>handleDelete(rs._id)} className="btn btn-secondary">삭제</button>
                </td>*/}
            </tr>
            ))}
        </tbody>
        </table>
  );
}

export default SearchList