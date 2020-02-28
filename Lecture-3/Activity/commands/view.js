let fs=require("fs");
let path=require("path");
module.exports.view=function()
{
    let src=arguments[0];
    let mode=arguments[1];
    switch(mode)
    {
        case "-t":
                viewastree(src,"");
                break;
        case "-f":
                viewasflat(src);
                break;
        default:
                console.log("Wrong Command");
    }
}

function viewastree(src,spaces)
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
            viewastree(path.join(src,children[i]),spaces);
        }
        
    }
}
function viewasflat(src)
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
            viewasflat(path.join(src,children[i]));
        }
        
    }
}
