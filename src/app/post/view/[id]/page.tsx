"use client";
   
import React, { useEffect, useState } from "react";
import axios from 'axios' // https 비동기 통신 라이브러리
import Link from "next/link";
import "../../../globals.css"
import elapsedTime from "@/src/app/ui/time";

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
      <div>
        {userData.map((rs, index) => (
          <div key={rs.id} className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-4 dark:bg-gray-800 dark:border-gray-700">
            <div className="text-2xl p-1">{rs.title}</div>

            {/* <div className="title-box">포스트{rs.board_id}</div> */}
            <div className="grid grid-flow-col">
              <div className="title-box">{rs.writer}</div>
              <div className="title-box text-right">{rs.regdate.split("T")[0]}</div>
            </div>
            
            <div className="title-box">{rs.content}</div>
            <div className="my-5">
              <Link href={`/post/edit/${params.id}`} className="white-btn">
              수정
              </Link>
              <Link href={process.env.NEXT_PUBLIC_BASE_URL+"/api/post/delete/"+params.id} className="white-btn">
              삭제
              </Link>
            </div>
          </div>
        ))}
      </div>
    )
  }