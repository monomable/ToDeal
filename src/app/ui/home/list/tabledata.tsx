"use client";
   
import React, { useEffect, useState } from "react";
import axios from 'axios' // https 비동기 통신 라이브러리
import Link from "next/link";

interface table {
    id : number;
    _id : number;
    board_id : string
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
            const result = await axios("http://localhost:5000/api/list");
            console.log(result.data);
            setUSerData(result.data);
        } catch (err) {
            console.log("somthing Wrong");
        }
    }
 
    
    const handleDelete=async(id: number)=>{
        console.log(id);
        await axios.delete("http://localhost:5000/deleteuser/"+id);
        const newUserData=userData.filter((item)=>{
            return(
                item._id !==id
            )
        })
        setUSerData(newUserData);
    }
  return (
        <table className="table table-zebra">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
            <th className="py-3 px-6">#</th>
            <th className="py-3 px-6">게시글ID</th>
            <th className="py-3 px-6">제목</th>
            <th className="py-3 px-6">내용</th>
            <th className="py-3 px-6 text-center">액션</th>
            </tr>
        </thead>
        <tbody>
            {userData.map((rs, index) => (
            <tr key={rs.id} className="bg-white border-b">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{rs.board_id}</td>
                <td className="py-3 px-6">{rs.title}</td>
                <td className="py-3 px-6">{rs.content}</td>
                <td className="flex justify-center gap-1 py-3">
                    <Link
                    href={`/user/view/${rs._id}`} 
                    className="btn btn-info">
                    조회
                    </Link>
                    <Link
                    href={`/user/edit/${rs._id}`} 
                    className="btn btn-primary">
                    수정
                    </Link>
                    <button onClick={()=>handleDelete(rs._id)} className="btn btn-secondary">삭제</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
  );
}