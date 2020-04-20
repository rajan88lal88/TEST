let fs = require("fs");
let path = require("path");

function checkfileDirectory(src){
  let ans=fs.lstatSync(src).isFile();
  return ans;
}

module.exports.view= function() {
  let src = arguments[0];
  let mode = arguments[1];
  if (mode == "-t") {
    viewAsTree(src,"");
  } else if (mode == "-f") {
    viewAsFlatFiles(src,"");
  } else {
    console.log("Wrong parameters");
  }
};
function viewAsTree(src,indent) {
  // console.log("view as tree")
  let isfile=checkfileDirectory(src);
  if(isfile==true)
  {
    console.log(indent+ path.basename(src));
  }
  else
  {
    console.log(indent+path.basename(src));
    let children=childread(src);
    for(let i=0;i<children.length;i++)
    {
      let child=children[i];
      let childpath=path.join(src,child);
      viewAsTree(childpath,indent+"\t");
    }

  }
}
function childread(src)
{
  let children=fs.readdirSync(src);
  return children;
}
function viewAsFlatFiles(src,indent) {
  // console.log("view as flat")
  let isfile=checkfileDirectory(src,indent);
  if(isfile==true)
  {
    console.log(path.join(indent,path.basename(src)+"*"));
  }
  else
  {
    console.log(path.join(indent,path.basename(src)));
    let children=childread(src);
    for(let i=0;i<children.length;i++)
    {
      let child=children[i];
      let childpath=path.join(src,child);
      viewAsFlatFiles(childpath,path.join(indent,path.basename(src)));
    }
  }
}
