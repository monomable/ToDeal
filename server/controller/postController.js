const Post = require("../models/model.js");

// 전체 조회 
exports.findAll = (req,res)=>{
    Post.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else res.send(data);
      });
};