export default function create() {
    return(
        <div className="p-20">
            <h4>글 작성 페이지</h4>
            <form action="/api/post/new" method="POST"> {/*api 입력*/}
                제목: <input type="text" className="px-20 border border-black" /> <br/>
                내용: <input type="text" className="px-20 py-40 border border-black" /> <br/>
                <button type="submit" className="white-btn">작성완료</button>
            </form>
        </div>
    ) 
  }