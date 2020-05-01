let files=["..//files/f1.txt","..//files/f2.txt","..//files/f3.txt","..//files/f4.txt","..//files/f5.txt"]
let fs=require("fs");
function readfile(){
    let datapromise=fs.promises.readFile(files[0])
    datapromise.then(function(content){
        if(content.byteLength>5)
        {
            console.log(content+"");
            let datapromise2=fs.promises.readFile(files[1])
            datapromise2.then(function (content1){
                if(content1.byteLength>20)
                {
                    console.log(content1+"");
                }
                else
                {
                    let datapromise3=fs.promises.readFile(files[2])
                    datapromise3.then(function (content2){
                        console.log(content2+"");
                    })
                }
            })
        }
        else
        {
            let datapromise4=fs.promises.readFile(files[3]);
            datapromise4.then(function(content3){
                console.log(content3+"");
            })
        }
        
    })
    datapromise.catch(function(err){
        console.log(err);
    })
}
readfile();