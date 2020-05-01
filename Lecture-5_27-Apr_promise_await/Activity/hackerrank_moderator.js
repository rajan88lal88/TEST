let fs = require("fs");
require("chromedriver");
let swd = require("selenium-webdriver");
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();
let cfile = process.argv[2];
let moderator = process.argv[3];

(async function () {
    try {
        await driver.manage().setTimeouts({implicit=10000, pageLoad=10000})
        let data = await fs.promises.readFile(cfile);
        let { username, password, url } = JSON.parse(data);
        await driver.get(url);
        let findUserInputPromise = driver.findElement(swd.By.css("#input-1"));
        let findPassInputPromise = driver.findElement(swd.By.css("#input-2"));
        let inputUserPassPromise = await Promise.all([findUserInputPromise, findPassInputPromise]);
        let sendUserPromise = inputUserPassPromise[0].sendKeys(username);
        let sendPassPromise = inputUserPassPromise[1].sendKeys(password);
        await Promise.all([sendUserPromise, sendPassPromise]);
        let buttonFindPromise = driver.findElement(swd.By.css(".ui-btn.ui-btn-large.ui-btn-primary.auth-button"));
        let button = await buttonFindPromise;
        button.click();
    }
    catch (err) {
        console.log(err);
    }
})()