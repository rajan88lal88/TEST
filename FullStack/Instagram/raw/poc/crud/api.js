//npm init -y
//npm i express
//npm i nodemon --save-dev
//create start script in package.json  "start":"nodemon crud/api.js"
//in package.json dir ->npm start
const express=require("express")
const app=express();
const fs=require("fs")
const path=require("path")
const userDB=require("./user.json")
//folder that can be used by any client
// app.get("/hello",function(req,res){
//     console.log("hello request");
//     res.status(200).json({
//         status:"successfully received get request from client"
//     })
// })`
// app.get("/bye",function(req,res){
//     console.log("Bye request");
//     res.status(200).json({
//         status:"successfully received get request from client"
//     })
// })
app.use(express.json());
app.post("/api/users",function(req,res){
    let user=req.body;
    userDB.push(user);
    fs.writeFileSync(path.join(__dirname,"user.json"),JSON.stringify(userDB));

    console.log(user);
    res.status(201).json({
        success:"successfully",
        user: user
    })
})
app.patch("/api/users",function(req,res){
    let updateduser=req.body;
    console.log(updateduser);
    for(let i=0;i<userDB.length;i++){
        if(userDB[i].user_id==updateduser.user_id)
            userDB[i]=updateduser;
    }
    fs.writeFileSync(path.join(__dirname,"user.json"),JSON.stringify(userDB));
    res.status(201).json({
        patch: "successful"
    })
})
app.delete("/api/users",function(req,res){
    let del=req.body;
    for(let i=0;i<userDB.length;i++){
        if(userDB[i]!=null&&userDB[i].user_id==del.user_id)
        {
            delete userDB[i];
        }
    }
    fs.writeFileSync(path.join(__dirname,"user.json"),JSON.stringify(userDB));
    res.status(201).json({
        delete:"successful"
    })
})
app.listen(3000,function(){
    console.log("Server started at port 3000");
})