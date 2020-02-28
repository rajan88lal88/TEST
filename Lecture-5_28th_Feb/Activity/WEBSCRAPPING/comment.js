let request=require("request");
let fs=require("fs");
let cheerio=require("cheerio");


request("https://www.espncricinfo.com/series/19322/commentary/1187677",function(err,res,html){
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
    let table=parse(parse(".description")[0]);
    let maxWick=0;
    let maxWickTaker="";
    // for(let i=0;i<table.length;i++)
    // {
    //     let tdArr=parse(table[i]).find("td");
    //     let wicket=parse(tdArr[5]).html();
    //     let bowlerName=parse(table[i]).find("td a").html();
    //     if(wicket>maxWick)
    //     {
    //         maxWick=wicket;
    //         maxWickTaker=bowlerName;
    //     }
    // }
    // data.push(table.find("tbody"));
    console.log(table.html());
    fs.writeFileSync("comment.html",table);
    // console.log(data);
}