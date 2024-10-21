module.exports=app=>{
    const Post=require("../controller/postController.js")
    app.get("/post", Post.findAll);
}