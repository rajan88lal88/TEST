let files = ["..//files/f1.txt", "..//files/f2.txt", "..//files/f3.txt", "..//files/f4.txt", "..//files/f5.txt"]
let fs = require("fs");
let datapromise=[]
let p1=fs.promises.readFile(files[0]);

p1.then(function(content){
    console.log(content+"");
    let p2=fs.promises.readFile(files[1]);
    p2.then(function(content){
        console.log(content+"");
        let p3=fs.promises.readFile(files[2]);
        p3.then(function(content){
            console.log(content+"");
            let p4=fs.promises.readFile(files[3]);
            p4.then(function(content){
                console.log(content+"");
                let p5=fs.promises.readFile(files[4]);
                p5.then(function(content){
                    console.log(content+"");
                })
            })
        })
    })
})
