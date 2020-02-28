module.exports.view=function()
{
    let src=arguments[0];
    let mode=arguments[1];
    switch(mode)
    {
        case "-t":
                viewastree(src);
                break;
        case "-f":
                viewasflat(src);
                break;
        default:
                console.log("Wrong Command");
    }
}
function viewastree()
{
    console.log("View as tree");
}
function viewasflat()
{
    console.log("View as flat");
}
