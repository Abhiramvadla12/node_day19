const express = require("express");
const cors = require("cors")
const app =express();
  
const conn = require("./database.js");
app.use(cors());
app.get("/pagination",(req,res)=>{

    let limit = req.query.limit ?? 0;
    let offset = req.query.offset ?? 0;



    conn.query("select * from btech limit ? offset ?",[Number(limit),Number(offset)],(err,info)=>{
        
        if(err){
                res.send({
                message:err.message,
                status:400,

            });
        }
        else{
            res.send({
                data:info,
                status:200,

            });
        }

    })
})
 
let port = 3000;
app.listen(port,()=>{
    console.log("server started");
})