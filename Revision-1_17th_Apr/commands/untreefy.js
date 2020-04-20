let fs = require("fs");
let path = require("path");
let uniqid = require("uniqid");


function checkfileDirectory(src){
  let ans=fs.lstatSync(src).isFile();
  return ans;
}

function childread(src)
{
  let children=fs.readdirSync(src);
  return children;
}

module.exports.untreefy = function() {
  console.log("untreefy command has been Called");
  let src = arguments[0];
  let dest = arguments[1];
  let node={};
  untreefy(src, dest,node);

  console.log(JSON.stringify(node));
  fs.writeFileSync(path.join(dest,"metadata.json"),JSON.stringify(node));
};

function untreefy(src, dest, root) {
  let isfile = checkfileDirectory(src);
  if (isfile == true) {
    let newFName = uniqid();
    //copy file from src to dest=> and rename them
    fs.copyFileSync(src, path.join(dest, newFName));
    root.isFile=true;
    root.oldName=path.basename(src);
    root.newName=newFName;
    } 
    else {
    root.name=path.basename(src);
    root.isFile=false;
    root.children=[];
    let childrens = childread(src);

    // console.log(childrens);
    for (let i = 0; i < childrens.length; i++) {
      let cPath = path.join(src, childrens[i]);
      let c_obj={};
      untreefy(cPath, dest,c_obj);
      root.children.push(c_obj);
    }
  }
}
