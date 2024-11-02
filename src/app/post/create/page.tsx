import "../../globals.css"

export default function create() {
    return(
        <div className="p-20">
            <h4>글 작성 페이지</h4>
            <form action="/api/post/create" method="POST"> {/*api 입력*/}
                제목: <input type="text" name="title" className="title-box my-2" /> <br/>
                작성자: <input type="text" name="writer" className="title-box my-2" /> <br/>
                내용: <input type="text" name="content" className="title-box" /> <br/>
                {/*시간: <input type="text" name="regdata" className="title-box" /> <br/>*/}
                <button type="submit" className="white-btn">작성완료</button>
            </form>
        </div>
    ) 
  }