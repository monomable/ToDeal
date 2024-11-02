"use client";
   
import React, { useEffect, useState } from "react";
import axios from 'axios' // https 비동기 통신 라이브러리
import Link from "next/link";
import "../../../globals.css"

interface post {
  id : number;
  _id : number;
  board_id : string
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

    return (
      <div>
        {userData.map((rs, index) => (
          <div key={rs.id}>
            <div className="title-box">포스트{rs.board_id}</div>
            <div className="title-box">작성일{rs.regdate}</div>
            <div className="title-box">제목:{rs.title}</div>
            <div className="title-box">내용:{rs.content}</div>
            <div className="my-5">
              <Link href={`/post/edit/${params.id}`} className="white-btn">
              수정
              </Link>
            </div>
          </div>
        ))}
      </div>
    )
  }