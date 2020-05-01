let fs = require("fs");
console.log("Before");
// console.log("start")
let fileWillBeReadPromise = fs.promises.readFile("files//f1.txt");
console.log(fileWillBeReadPromise)

fileWillBeReadPromise.then(function(content){
console.log("content has arrived")
  console.log(content+ "");
})

console.log("After");
// console.log(" I will execute");