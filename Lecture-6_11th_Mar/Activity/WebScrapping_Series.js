let request=require("request");
let fs=require("fs");
let cheerio=require("cheerio");


request("https://www.espncricinfo.com/scores/series/19322/",function(err,res,html){
    if(err==null&& res.statusCode==200)
    {
        console.log("page fetched");
        fs.writeFileSync("series.html",html);
        parseHtml(html);
    }
    else if(res.statusCode==404)
    {
        console.log("Page Not Found");
    }
    else
    {
        console.log(err);
        console.log(res.statusCode);
    }
})

function parseHtml(html)
{
    console.log("Parsing");

    let parse=cheerio.load(html);
    let cards=cheerio(".cscore.cscore--final.cricket.cscore--watchNotes");
    for(let i=0;i<cards.length;i++)
    {
        console.log(cards[i]);

    }
    fs.writeFileSync("cards.html",cards);
    // console.log(data);
}