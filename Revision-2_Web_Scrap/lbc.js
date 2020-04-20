let request=require("request");
let fs=require("fs");
let cheerio=require("cheerio");
console.log("before");
request("https://www.espncricinfo.com/series/19322/commentary/1187683",function(err,res,html){
    if(err===null&& res.statusCode===200)
    {
        console.log("page fetched");
        fs.writeFileSync("lbc.html",html);
        parseHTML(html);
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

function parseHTML(html)
{
    console.log("***********************");
    let data=cheerio.load(html);
    let itemWrapper=data(".item-wrapper .description")
    console.log(data(itemWrapper[0]).text());
}
console.log("after");