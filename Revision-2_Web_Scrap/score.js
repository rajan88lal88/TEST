let request=require("request");
let fs=require("fs");
let cheerio=require("cheerio");
console.log("before");
request("https://www.espncricinfo.com/series/19322/scorecard/1187683",function(err,res,html){
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
    let itemWrapper=data(".scorecard-section.bowling table tbody tr")
    let max=0;
    let bowler="";
    let wicket=0;
    let maxbowler="";
    let maxwicket=0;
    for(let i=0;i<itemWrapper.length;i++)
    {
        bowler=data(data(itemWrapper[i]).find("td")[0]).text();
        wicket=data(data(itemWrapper[i]).find("td")[5]).text();
        if(wicket>maxwicket)
        {
            maxwicket=wicket;
            maxbowler=bowler;
        }
    }
    console.log(maxbowler+"\t"+maxwicket)
}
console.log("after");