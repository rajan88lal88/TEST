let fs=require("fs");
let path=require("path");
function displayTree(src,spaces)
{
    
    let ans=fs.lstatSync(src).isDirectory();
    if(ans==false)
    {
        console.log(spaces+path.basename(src)+"*");
        spaces=spaces+"\t";
    }
    else{
        
        console.log(spaces+path.basename(src));
        spaces=spaces+"\t";
        let children=fs.readdirSync(src);
        
        for(let i=0;i<children.length;i++)
        {
            displayTree(path.join(src,children[i]),spaces);
        }
        
    }
}
let src="C:\\Users\\rajan\\OneDrive\\College\\TPP\\Lecture-3\\src";
displayTree(src,"","src");