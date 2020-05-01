let fs = require("fs");
let files = ["..//files/f1.txt", "..//files/f2.txt", "..//files/f3.txt", "..//files/f4.txt", "..//files/f5.txt"]
async function conditional() {
    let data1 = await fs.promises.readFile(files[0]);
    if (data1.byteLength > 5) {
        console.log(data1 + "");
        let data2 = await fs.promises.readFile(files[1]);
        if (data2.byteLength > 20) {
            console.log(data2 + "");
        }
        else {
            let data3 = await fs.promises.readFile(files[2])
            console.log(data3 + "");
        }
    }
    else {
        let data4 = await fs.promises.readFile(files[3])
        console.log(data4 + "");
    }
}
conditional();