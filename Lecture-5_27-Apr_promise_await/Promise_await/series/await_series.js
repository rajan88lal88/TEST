let fs=require("fs");
let files=["..//files/f1.txt","..//files/f2.txt","..//files/f3.txt","..//files/f4.txt","..//files/f5.txt"]
async function awaitcb() {
    try {
        let data1 = await fs.promises.readFile(files[0]);
        console.log(data1+"");
        let data2 = await fs.promises.readFile(files[1]);
        console.log(data2+"");
        let data3 = await fs.promises.readFile(files[2]);
        console.log(data3+"");
        let data4 = await fs.promises.readFile(files[3]);
        console.log(data4+"");
        let data5 = await fs.promises.readFile(files[4]);
        console.log(data5+"");
    } catch (err) {
        console.log("Inside catch");
        console.log(err);
    }
}
awaitcb();
