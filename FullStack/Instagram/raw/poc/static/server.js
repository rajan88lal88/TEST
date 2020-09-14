const express=require("express")
const e = require("express")
const app=express();

//folder that can be used by any client
app.use(express.static("C:\\Users\\rajan\\OneDrive\\College\\PEP_CODING\\TPP\FullStack\\Instagram\\raw\\poc\\public"));

app.listen(3000,function(){
    console.log("Server started at port 3000");
})