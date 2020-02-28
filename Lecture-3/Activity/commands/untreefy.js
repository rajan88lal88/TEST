let fs = require("fs");
let path = require("path");
let uniqid=require("uniqid");
module.exports.untreefy = function (src, dest) {
  untree(src, dest);

}
function untree(src, dest) {
  let ans = fs.lstatSync(src).isDirectory();
  if (ans == false) {
    let uname=uniqid();
    fs.copyFileSync(src, path.join(dest,uname+"-"+path.basename(src)));
    

  }
  else {

    let children = fs.readdirSync(src);

    for (let i = 0; i < children.length; i++) {
      untree(path.join(src, children[i]), dest);
    }

  }
}
