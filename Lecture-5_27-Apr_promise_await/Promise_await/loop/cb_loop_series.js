let fs = require("fs");

let files=["..//files/f1.txt","..//files/f2.txt","..//files/f3.txt","..//files/f4.txt","..//files/f5.txt"]
function readf(i)
{
    fs.readFile(files[i], function (err, content) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(content + "");
          readf(i+1);
        }
      })
      
}
readf(0);