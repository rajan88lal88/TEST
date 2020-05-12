let puppeteer = require("puppeteer");
let song = process.argv[2];


(async function () {
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["start--maximized", "--disable-notifications"]

    });
    console.log(song)
    let pages = await browser.pages();
    let page = pages[0];
    await page.setDefaultNavigationTimeout(0);
    await page.goto("https://www.youtube.com/results?search_query=" + song)
    console.log("page loaded")
    let link = await page.$("#contents > ytd-video-renderer:nth-child(1)")
    await link.click()
    await page.waitForNavigation()
    let url = page.url()

    await page.setRequestInterception(true);

    page.on('request', request => {
        if (request.isNavigationRequest() && request.redirectChain().length !== 0) {
            request.abort();
        } else {
            request.continue();
        }
    });
    await page.goto("https://youtubemp3.today/v12/", { waitUntil: "networkidle0" })
    await page.waitForSelector("#dlURL");
    await page.type("#dlURL", encodeURI(url));
    let submit = await page.waitForSelector("#dlBTN1 > span.hidden-xs")
    await submit.click();
    
    await page.waitForSelector('#dlbutton',{visible:true});
    // await page.waitForSelector("#buttons > a")
    let button = await page.$("#dlbutton")
    await button.click();
    // console.log(button.length)
    // let download_url = "";
    await sleep(2000)
    // console.log(download_url)
    // download_url = await page.evaluate(function (el) {
    //     return el.getAttribute("href")
    // }, button[0])
    // await page.click('#content > #converter_wrapper > #converter > #buttons > a:nth-child(1)')
    // await sleep(1000)

})()
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}  