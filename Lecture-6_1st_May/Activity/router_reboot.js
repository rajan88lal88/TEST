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

  
    await page.type("#login-password", password);
    await page.click("#save");

    await page.waitForNavigation({ waitUntil: "networkidle0" });
    
    await page.waitForSelector("#system");
    await page.click("#system");
    await page.waitForSelector("#reboot");
    await page.click("#reboot");
})()