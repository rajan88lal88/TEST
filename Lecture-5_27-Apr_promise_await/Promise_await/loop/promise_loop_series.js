let files=["..//files/f1.txt","..//files/f2.txt","..//files/f3.txt","..//files/f4.txt","..//files/f5.txt"]
let fs=require("fs");
function readfile(i){
    if(i==5)
        return;
    let datapromise=fs.promises.readFile(files[i])
    datapromise.then(function(content){
        console.log(content+"");
        readfile(i+1);
    })
    datapromise.catch(function(err){
        console.log(err);
    })
}
readfile(0);