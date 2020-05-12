let puppeteer = require("puppeteer");
let playlist_to_download = "https://www.youtube.com/playlist?list=PLtpj6Ey2HCqSPL6sV9rRHAc_yYVJ8BLRm";


(async function () {
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["start--maximized", "--disable-notifications"]

    });
    let pages = await browser.pages();
    let page = pages[0];
    await page.setDefaultNavigationTimeout(0);
    await page.goto(playlist_to_download, { waitUntil: "domcontentloaded" })
    console.log("page loaded")
    await page.waitForSelector("#contents")
    let list_url = await page.$$("#content > a")
    let list_name = await page.$$("#video-title")
    let names = []
    let links = []
    console.log(list_name.length)
    for (let i = 0; i < 2; i++) {

        names.push(await page.evaluate(function (el) {
            return el.getAttribute("title")
        }, list_name[i]))
        links.push("https://www.youtube.com" + await page.evaluate(function (el) {
            return el.getAttribute("href");
        }, list_url[i]))
    }
    // console.log(name)
    
    for (let i = 0; i < 1; i++) {
        try {
            console.log(i+1)
            await page.goto("https://ytmp3.cc/en13/", { waitUntil: "domcontentloaded" })
            await page.waitForSelector("#input");
            await page.type("#input", encodeURI(links[i]));
            let submit = await page.waitForSelector("#submit")
            await submit.click();
            await page.waitForSelector('#progress', { visible: false });
            await page.waitForSelector("#buttons > a")
            let button = await page.$$("#buttons > a")
            // console.log(button.length)
            let download_url = "";
            await sleep(2000)
            console.log(download_url)
            download_url = await page.evaluate(function (el) {
                return el.getAttribute("href")
            }, button[0])
            await page.click('#content > #converter_wrapper > #converter > #buttons > a:nth-child(1)')
            await sleep(1000)
        } catch (UnhandledPromiseRejectionWarning) {
            await page.goto("https://ytmp3.cc/en13/", { waitUntil: "domcontentloaded" })
        }
    }

})()
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}  