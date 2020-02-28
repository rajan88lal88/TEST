let fs=require("fs");
let path=require("path");
function displayList(src)
{
    let ans=fs.lstatSync(src).isDirectory();
    if(ans==false)
    {
        console.log(src+"*");
    }
    else{
        console.log(src);
        let children=fs.readdirSync(src);
        for(let i=0;i<children.length;i++)
        {
            displayList(path.join(src,children[i]));
        }
        
    }
}
let src="C:\\Users\\rajan\\OneDrive\\College\\TPP\\Lecture-3\\src";
displayList(src);