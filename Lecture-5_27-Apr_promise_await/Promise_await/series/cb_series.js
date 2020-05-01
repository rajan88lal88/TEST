let fs = require("fs");
let files=["..//files/f1.txt","..//files/f2.txt","..//files/f3.txt","..//files/f4.txt","..//files/f5.txt"]
fs.readFile(files[0], function (err, content) {
  if (err) {
    console.log(err);
  }
  else {
    console.log(content + "");
    fs.readFile(files[1], function (err, content) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(content + "");
          fs.readFile(files[2], function (err, content) {
            if (err) {
              console.log(err);
            }
            else {
              console.log(content + "");
            }
          })
        }
      })
  }
})
