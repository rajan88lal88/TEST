let fs=require("fs");
let files=["..//files/f1.txt","..//files/f2.txt","..//files/f3.txt","..//files/f4.txt","..//files/f5.txt"]

async function read(file)
{
    let data=await fs.promises.readFile(file);
    console.log(data+"");
}
for(let i=0;i<5;i++)
{
    read(files[i]);
}

