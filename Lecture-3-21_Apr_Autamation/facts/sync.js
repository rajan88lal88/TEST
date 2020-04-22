let fs=require("fs");
console.log("Before");
console.log("Start");
let content=fs.readFileSync("f1.html");
console.log(content+"");
console.log("finish");
console.log("After");