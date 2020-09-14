// npm init -y 
// npm i express
//  npm i nodemon --save-dev
// create start script int Package.json=>  "start":"nodemon crud/api.js"
// in pkg.json dir => npm start
const express = require("express");
const app = express();
let userDB = require("./model/user.json");
const fs = require("fs");
const path = require("path");
const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter");
app.use(express.static(__dirname + "/view"));
app.use(express.json());

// get Request => 
// localhost:3000/api/users/user_id
app.use("/api/v1/users", userRouter);
app.use("/api/v1/post", postRouter);

// localhost:3000/api/users
app.listen(3000, function () {
    console.log("Server is listening at port 3000");
})