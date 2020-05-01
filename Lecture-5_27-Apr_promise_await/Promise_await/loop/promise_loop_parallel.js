let fs = require("fs");
function promiseMultiFileReader() {
    let files=["..//files/f1.txt","..//files/f2.txt","..//files/f3.txt","..//files/f4.txt","..//files/f5.txt"]
  for (let i = 0; i < files.length;) {
    let nsp = fs.promises.readFile(files[i++]);
    nsp.then(function (data) {
      console.log(data+"");
    })
    nsp.catch(function (err) {
      console.log(err)
    })
  }
}
promiseMultiFileReader()