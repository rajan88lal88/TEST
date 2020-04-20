
let fs = require("fs");
let path = require("path");
module.exports.treefy = function () {
    let src = arguments[0]
    let dest = arguments[1]
    let node = require(path.join(src, "metadata.json"));
    // console.log(node);
    treefy(src,dest,node);
};

function treefy(src,dest,node)
{
    if(node.isFile==true)
    {
        fs.copyFileSync(path.join(src, node.newName), path.join(dest, node.oldName));
    }
    else
    {
        fs.mkdirSync(path.join(dest, node.name));
        for(let i=0;i<node.children.length;i++)
        {
            treefy(src,path.join(dest, node.name),node.children[i]);
        }
    }
}