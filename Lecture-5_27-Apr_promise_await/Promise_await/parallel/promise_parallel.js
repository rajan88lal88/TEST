let files = ["..//files/f1.txt", "..//files/f2.txt", "..//files/f3.txt", "..//files/f4.txt", "..//files/f5.txt"]
let fs = require("fs");
let datapromise=[]
let p1=fs.promises.readFile(files[0]);
let p2=fs.promises.readFile(files[1]);
let p3=fs.promises.readFile(files[2]);
let p4=fs.promises.readFile(files[3]);
let p5=fs.promises.readFile(files[4]);
p1.then(function(content){
    console.log(content+"");
})
p1.catch(function(err){
    console.log(err);
})
p2.then(function(content){
    console.log(content+"");
})
p2.catch(function(err){
    console.log(err);
})
p3.then(function(content){
    console.log(content+"");
})
p3.catch(function(err){
    console.log(err);
})
p4.then(function(content){
    console.log(content+"");
})
p4.catch(function(err){
    console.log(err);
})
p5.then(function(content){
    console.log(content+"");
})
p5.catch(function(err){
    console.log(err);
})
