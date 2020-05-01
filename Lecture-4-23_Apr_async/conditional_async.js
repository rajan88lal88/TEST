let files = ["f1.txt", "f2.txt", "f3.txt", "f4.txt", "f5.txt", "f6.txt", "f7.txt"];
let fs = require("fs");
fileread(0);
function fileread(i) {
    if(i>=files.length)
        return;
    fs.readFile(files[i], function (err, file) {
        console.log(`File ${i+1}: ${file.byteLength}`);
        if (file.byteLength > 40)
            fileread(2*i+1);
        else
            fileread(2*i+2)
    })
}