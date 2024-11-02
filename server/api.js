const post = require("./models/model.js")

// 아직 사용되고 있지 않음
exports.findAll=(req,res)=>{
    Postpone.getAll((err,data)=>{
        if(err)
            res.status(500).send({message:err.message||"Some error occurred while retrieving posts."});
        else res.send(data);
    });
};