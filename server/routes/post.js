module.exports=app=>{
    const Post=require("../controller/postController.js")
    app.get("/post", Post.findAll);

    app.get("/post/view/:customerId", customers.findOne);
}