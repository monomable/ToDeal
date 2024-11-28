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
 
export default function Users() {
    const [userData, setUSerData] = useState<table[]>([]);
    
    useEffect(() => {
        fetchData();
    }, [])
  
    const fetchData = async () => {
        try {
            const result = await axios(process.env.NEXT_PUBLIC_BASE_URL+"/api/post/list");
            console.log(result.data);
            setUSerData(result.data);
        } catch (err) {
            console.log("somthing Wrong");
        }
    }
 
    
    const handleDelete=async(id: number)=>{
        console.log(id);
        await axios.delete(process.env.NEXT_PUBLIC_BASE_URL+"/deletepost/"+id);
        const newUserData=userData.filter((item)=>{
            return(
                item._id !==id
            )
        })
        setUSerData(newUserData);
    }
  return (
        <table className="table table-zebra max-w-[730px]">
            <thead className="text-sm text-gray-700 uppercase bg-gray-100">
                {/*<tr>
                    <th className="py-1 px-16">작성자</th>
                    <th className="py-1 px-16">제목</th>
                </tr>*/}
            </thead>
            
                {userData.map((rs, index) => (
                <tbody key={rs.board_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <tr className="">
                        <td className="py-3 px-6 font-bold">
                            <Link className="block" href={`/post/view/${rs.board_id}`}>{rs.title}</Link>
                        </td>
                        <td className="py-3 px-6 text-sm md:w-80 justify-items-end text-right">
                            <Link className="block" href={`/post/view/${rs.board_id}`}>{rs.writer} : 작성자</Link>
                        </td>
                    </tr>
                    <tr className="">
                        <td colSpan={2} className="py-3 px-6 w-[730px]">
                            <Link className="block" href={`/post/view/${rs.board_id}`}>{rs.content}</Link>
                        </td>
                    </tr>
                </tbody>
                ))}
            
        </table>
  );
}