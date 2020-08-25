const express=require("express");
const app=express();
app.get("/home",function(req,res){
    res.end("My homepage");
})

app.listen(3000,function(){
    console.log("server is listening to port 3000");
})