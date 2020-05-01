let fs=require("fs");
let files=["..//files/f1.txt","..//files/f2.txt","..//files/f3.txt","..//files/f4.txt","..//files/f5.txt"]
async function awaitcb() {
    try {
        let data = await fs.promises.readFile(files[0]);
        console.log(data+"");
    } catch (err) {
        console.log("Inside catch")
        console.log(err);
    }
}
awaitcb()

