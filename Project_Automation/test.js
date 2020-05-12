const puppeteer = require('puppeteer');
url = "magnet:?xt=urn:btih:488D8FB0C85C315A7FB83FEE6E2B4C9C20BFDA4C&dn=Tamasha (2015) Hindi - 720p BluRay - 1.2GB - Zaeem&tr=udp://tracker.coppersurfer.tk:6969/announce&tr=udp://9.rarbg.to:2920/announce&tr=udp://tracker.opentrackr.org:1337&tr=udp://tracker.internetwarriors.net:1337/announce&tr=udp://tracker.leechers-paradise.org:6969/announce&tr=udp://tracker.coppersurfer.tk:6969/announce&tr=udp://tracker.pirateparty.gr:6969/announce&tr=udp://tracker.cyberia.is:6969/announce";
(async function () {
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized", "--disable-notifications"]
    });
    let tabs = await browser.pages();
    let tab = tabs[0];

    await tab.goto(url, { waitUntil: "networkidle" });

    // await tab.goto(url, { waitUntil: "networkidle2" });
    setTimeout(async function(){await tab.keyboard.press(String.fromCharCode(13))},1000)

    

})()