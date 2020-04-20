let request=require("request");
let fs=require("fs");
console.log("before");
request("https://www.google.com",function(err,res,html){
    if(err==null&& res.statusCode==200)
    {
        console.log("page fetched");
        fs.writeFileSync("commentary.html",html);
    }
    else if(res.statusCode==404)
    {
        console.log("Invalid URL");
    }
    else
    {
        console.log(err);
        console.log(res.statusCode);
    }
})
console.log("after");