
let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
console.log("before");
let leaderboard=[];
let count=0;

request("https://www.espncricinfo.com/scores/series/19322", function (err, res, html) {
    if (err === null && res.statusCode === 200) {
        console.log("page fetched");
        fs.writeFileSync("leaderboard.html", html);
        parseHTML(html);
    }
    else if (res.statusCode == 404) {
        console.log("Invalid URL");
    }
    else {
        console.log(err);
        console.log(res.statusCode);
    }
})

function parseHTML(html) {
    console.log("***********************");
    let data = cheerio.load(html);
    let cards = data(".cscore.cscore--final.cricket.cscore--watchNotes")
    // fs.writeFileSync("cards.html",cards);
    // console.log(cards.length);
    for (let i = 0; i < cards.length; i++) {
        // console.log(data(cards[i]).find(".cscore_info-overview").text());
        if (data(cards[i]).find(".cscore_info-overview").text().includes("T20") || data(cards[i]).find(".cscore_info-overview").text().includes("ODI")) {
            // console.log(data(cards[i]).find(".cscore_info-overview").text());
            let scorecard = data(cards[i]).find(".cscore_buttonGroup ul li a").attr("href");
            let url = `https://www.espncricinfo.com${scorecard}`;
            // console.log(url);
            match(url);
        }
    }

}
function  match(MatchLink) 
{
    count++;
    request(MatchLink, function (err, res, html) 
    {
        if (err === null && res.statusCode === 200) 
        {
            // console.log( File ${count} saved to disk); 
            // fs.writeFileSync(match${count}.html, html); 
            handleMatch(html);
            count--;
            if(count==0)
            {
                printdata(leaderboard);
            }
        } 
        else if (res.statusCode == 404) 
        {
            console.log("Invalid URL");
        } 
        else 
        {
            console.log(err); 
            console.log(res.statusCode);
        }
    }
)}

function handleMatch(html)
{
    let data=cheerio.load(html);
    let teams=data(".sub-module.scorecard h2");
    let innings=data(".sub-module.scorecard");
    let format=data(".cscore_info-overview").text().includes("ODI")?"ODI":"T20";
    // console.log(data(handle[0]).html());
    // fs.writeFileSync("cards.html",innings);
    // let teams=data(".sub-module.scorecard .cell.batsmen").html();
    // console.log("**************************");
    for(let i=0;i<innings.length;i++)
    {
        let team=data(teams[i]).text();
        let batsmen=data(innings[i]).find(".scorecard-section.batsmen .wrap.batsmen");
        
        for(let j=0;j<batsmen.length;j++)
        {
            let batsman=data(batsmen[j]).find(".cell.batsmen").text();
            let runs=data(data(batsmen[j]).find(".cell.runs")[0]).text();
            // console.log(batsman+"\t:"+runs+"\t:"+team+"\t"+format);
            handleplayer(batsman,runs,team,format);
        }
        // console.log("......................");
    }
    // console.log("*************************");
}



function handleplayer(bat,run,team,format)
{
    run=Number(run);
    for(let i=0;i<leaderboard.length;i++)
    {
        let temp=leaderboard[i];
        if(temp.Name==bat&&temp.Team==team&&temp.Format==format)
        {
            temp.Runs+=run;
            return
        }
    }
    let player={
        Runs:run,
        Format:format,
        Team:team,
        Name:bat
    };
    leaderboard.push(player);
}
function printdata(leaderboard)
{
    console.table(leaderboard);
}