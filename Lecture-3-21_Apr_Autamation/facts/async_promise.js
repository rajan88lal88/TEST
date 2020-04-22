let fs=require("fs");
console.log("Before");
console.log("begin")
let filepromise=fs.promises.readFile("f1.html");
filepromise.then(function(content){
    console.log(content+"");
    console.log("finish");
})
filepromise.catch(function(err){
    console.log(err);
})
console.log("After");