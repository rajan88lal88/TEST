let fs = require("fs");

let files=["..//files/f1.txt","..//files/f2.txt","..//files/f3.txt","..//files/f4.txt","..//files/f5.txt"]
for(let i=0;i<5;i++)
{
    fs.readFile(files[i], function (err, content) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(content + "");
        
        }
      })
      
}