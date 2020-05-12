let puppeteer = require("puppeteer");
let movieToDownload = "Tamasha";


(async function () {
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        arg: ["start--maximized"]
    });
    let pages = await browser.pages();
    let page = pages[0];
    await page.setDefaultNavigationTimeout(0);
    await page.goto("https://piratebaylive.online", { waitUntil: "networkidle0" });
    /******Search the movie ************** */
    await page.waitForSelector("input[type=search]", { timeout: 0, visible: true });
    await page.type("input[type=search]", movieToDownload);
    await page.keyboard.press("Enter");
    /****** check if there is any result ********** */
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    /*******check if movie is there or not********* */
    let allElements = await page.$$(".list-entry span");
    let nameBox = allElements[1];
    let name = await page.evaluate(function (el) {
        return el.textContent;
    }, nameBox);
    if (name == "No results returned") {
        console.log("Sorry, we cannot dowload your movie.");
        await page.evaluate(function () {
            alert("Sorry! Your movie was not found.");
        })
    } else {
        /****click on first link *********** */
        let allMovieList = await page.$$(".list-entry");
        let firstMovie = await allMovieList[0].$$("span");
        let movieNamePromise = await firstMovie[1];
        await Promise.all([
            movieNamePromise.click(),
            page.waitForNavigation({ waitUntil: "networkidle2" })
        ]);

        /*******get the file torrent ********** */
        await page.waitForSelector("#d", { visible: true });
        await page.click("#d");
        let styles = await page.$$("[style]");
        console.log(styles.length);
        await styles[styles.length - 1].click();

        let newurl = page.url();
        console.log(newurl);
        // !important 
        // page.keyboard.press(String.fromCharCode(13));
        // setTimeout(function(){ page.on("dialog", (dialog) => {
        //     console.log("dialog");
        //     dialog.accept();
        //   })},1000)
        var insertedNodes = [];
        await page.addListener("DOMNodeInserted", function (e) {
            insertedNodes.push(e.target);
        }, false);
        console.log(insertedNodes);

    }
    console.log("connected successfully.")
})()