const sql = require("../connectDB.js");

const Post = function(post){
    this.board_id = post.board_id
    this.writer = post.writer
    this.title = post.title
    this.content = post.content
    this.regdate = post.regdate
};

// post 전체 조회
Post.getAll=result=>{ 
    sql.query('SELECT * FROM Post',(err,res)=>{
        if(err){
            console.log("error:",err);
            result(err,null);
            return;
        }

        console.log("customer:",res);
        result(null,res);
    });
};