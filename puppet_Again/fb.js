let puppeteer = require("puppeteer");
let cFile = process.argv[2];
let fs = require("fs");
let pUrl = process.argv[3];
let nPost = process.argv[4];
let scrollPageToBottom = require("puppeteer-autoscroll-down");
(async function () {
  // browser create => icognito mode,fullscreen
  try {
    let data = await fs.promises.readFile(cFile);
    console.log(JSON.stringify(data) + "");
    let { url, pwd, user } = JSON.parse(data);
    // launch browser
    let browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized", "--disable-notifications"]
    });
    // tab
    let tabs = await browser.pages();
    let tab = tabs[0];

    await tab.goto(url, { waitUntil: "networkidle2" });
    await tab.waitForSelector("input[type=email]");
    await tab.type("input[type=email]", user, { delay: 120 });
    await tab.type("input[type=password]", pwd, { delay: 120 });

    await Promise.all([
      tab.click(".login_form_login_button"), tab.waitForNavigation({
        waitUntil: "networkidle2"
      })
    ])
    await tab.goto(pUrl, { waitUntil: "networkidle2" });
    await tab.waitForSelector("div[data-key=tab_posts]");
    await Promise.all([
      tab.click("div[data-key=tab_posts]"),
      tab.waitForNavigation({ waitUntil: "networkidle2" })
    ])
    await tab.waitForNavigation({ waitUntil: "networkidle2" });

    let idx = 0;
    do {
      //  post => 7 post => are loaded 
      await tab.waitForSelector("#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager",{visible:true});
      // children selector
      
      let elements = await tab.$$("#pagelet_timeline_main_column ._1xnd > ._4-u2._4-u8")
      // saftey
      // console.log(elements.length);
      let post = elements[idx];
      // like -> selector
      await tab.waitForSelector("._666k ._8c74");
      let like = await post.$("._666k ._8c74");
      await like.click({ delay: 100 });
      idx++;
      console.log(idx);
      // await scrollPageToBott/om(tab, 10, 100);
      await tab.waitForSelector(".uiMorePagerLoader", { hidden: true , delay:200})
    } while (idx < nPost)
  } catch (err) {
    console.log(err)
  }
})()

