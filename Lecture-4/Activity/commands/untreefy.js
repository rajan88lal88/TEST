let fs = require("fs");
let path = require("path");
let uniqid = require("uniqid");
module.exports.untreefy = function (src, dest) {
  let tree={};
  untree(src, dest,tree);
  console.log(tree);

}
function untree(src, dest,node) {
  let ans = fs.lstatSync(src).isDirectory();
  if (ans == false) {
    let uname = uniqid();
    node.isFile=true;
    node.name=path.basename(src);
    node.newName=uname+"-"+path.basename(src);
    fs.copyFileSync(src, path.join(dest, uname + "-" + path.basename(src)));


  }
  else {

    node.isFile=false;
    node.name=path.basename(src);
    node.children=[];
    let children = fs.readdirSync(src);

    for (let i = 0; i < children.length; i++) {
      node.children[i]={};
      untree(path.join(src, children[i]), dest,node.children[i]);
    }

  }
}
