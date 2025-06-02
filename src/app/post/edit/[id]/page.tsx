"use client";
   
import React, { useEffect, useState } from "react";
import axios from 'axios' // https 비동기 통신 라이브러리

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

    return (
      <div>
        {userData.map((rs, index) => (
          <div key={rs.id}>
              <div className="title-box">포스트{+rs.board_id}</div>
              {/*작성일<div className="title-box">{rs.regdate}</div>*/}
              <form method="post" action={"/api/post/edit/"+rs.board_id}>
                제목:<textarea name="title" className="title-box">{rs.title}</textarea>
                작성자:<textarea name="writer" className="title-box">{rs.writer}</textarea>
                내용:<textarea name="content" className="title-box">{rs.content}</textarea>
                <div className="my-5">
                  <input type="submit" value={'수정완료'} className="white-btn"/>
                </div>
              </form>
          </div>
        ))}
      </div>
    )
  }