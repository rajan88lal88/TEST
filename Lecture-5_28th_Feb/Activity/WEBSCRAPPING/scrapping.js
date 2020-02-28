let request=require("request");
let fs=require("fs");
let cheerio=require("cheerio");


request("https://www.espncricinfo.com/series/19322/scorecard/1187679",function(err,res,html){
    if(err==null&& res.statusCode==200)
    {
        console.log("page fetched");
        fs.writeFileSync("scorecard.html",html);
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
    let table=parse(".scorecard-section.bowling").html();
    fs.writeFileSync("table.html",table);
    console.log("table written to file");
}