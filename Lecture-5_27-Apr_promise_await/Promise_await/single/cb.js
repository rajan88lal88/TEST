let fs = require("fs");


fs.readFile("..//files//f1.txt", function (err, content) {
  if (err) {
    console.log(err);
  }
  else {
    console.log(content + "");
  }
})
