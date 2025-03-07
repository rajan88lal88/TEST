let puppeteer = require("puppeteer");
let cFile = process.argv[2];
let fs = require("fs");
let moderator = process.argv[3];

let challenges = [];


(async function () {
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--incognito"]
    })
    let pages = await browser.pages();
    let page = pages[0];
    let credentials = await fs.promises.readFile(cFile);
    let { url, password, username } = JSON.parse(credentials);
    await page.goto(url, { waitUntil: "networkidle0" });

    await page.type("#input-1", username);
    await page.type("#input-2", password);
    await page.click("button[data-analytics=LoginPassword]");

    await page.waitForNavigation({ waitUntil: "networkidle0" });
    await page.waitForSelector("a[data-analytics=NavBarProfileDropDown]", { visible: true });
    await page.click("a[data-analytics=NavBarProfileDropDown]");
    await page.click("a[data-analytics=NavBarProfileDropDownAdministration]");
    await waitForLoader(page);
    console.log("fetched adminstration page");


    await page.waitForSelector(".administration header", { visible: true });
    let tabs = await page.$$(".administration header ul li a");

    let href = await page.evaluate(function (el) {
        return el.getAttribute("href");
    }, tabs[1])
    console.log(href);
    let managePURL = "https://www.hackerrank.com" + href;

    await page.goto(managePURL);
    await waitForLoader(page);
    console.log("challenges page opened");
    let list = [];
    list = await navigatePages(page);
    //opening challenges page
    // await page.waitForNavigation({ waitUntil: "networkidle0" });
    console.log("all question fetched : " + challenges.length);
    await addModerator(page, moderator);


})()

async function addModerator(page, moderator) {
    for (let i = 0; i < challenges.length; i++) {
        
        await challengeModerator(page, moderator,"https://hackerrank.com"+challenges[i]);
        // while(true){}
    }

}
async function challengeModerator(page, moderator,url) {
    page.goto(url);
    // waitForLoader();
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    await page.waitForSelector(".tabs-cta-wrapper");
    let tabs = await page.$$(".tabs-cta-wrapper li");
    await tabs[1].click();
    waitForLoader();
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    await page.waitForSelector("#moderator");
    await page.type("#moderator", moderator);
    // await page.press("Enter");
    await page.click("#content div section div div div.formgroup.horizontal.row div div button");
    await page.click("#content div div div div button.save-challenge.btn.btn-green");

}
async function navigatePages(page) {
    let list = [];
    while (true) {
        list.concat(await getquestion(page));
        await page.waitForSelector(".pagination ul a");
        let pagination = await page.$$(".pagination ul a");
        console.log("pagination length :" + pagination.length);
        let status = await page.evaluate(function (ele) {
            return ele.getAttribute("data-attr7");
        }, pagination[4]);
        // status=await pagination[pagination.length-2].getProperty('class');
        console.log(status);
        if (status == null) {
            return list;
        }
        else {
            let href = await page.evaluate(function (ele) {
                return ele.getAttribute("href");
            }, pagination[4]);
            // console.log(href);
            await page.goto("https://hackerrank.com" + href);
        }
    }
}

async function getquestion(page) {
    await page.waitForSelector('[class="backbone block-center"]')
    let quesList = await page.$$('[class="backbone block-center"]');
    console.log(quesList.length);

    for (let i = 0; i < quesList.length; i++) {
        let link = await page.evaluate(function (ele) {
            return ele.getAttribute("href");
        }, quesList[i]);
        // console.log(link);
        challenges.push(link);
    }
    return quesList;
}



async function waitForLoader(page) {
    await page.waitForSelector("#ajax-msg", { visible: false });
}
