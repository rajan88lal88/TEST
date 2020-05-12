const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["start--maximized", "--disable-notifications"]

})
  const page = await browser.newPage()
  
  const navigationPromise = page.waitForNavigation()
  
  await page.goto('http://www.anime1.com')
  
  await page.setViewport({ width: 1131, height: 700 })
  
  await page.waitForSelector('#center #HeaderSearch')
  await page.click('#center #HeaderSearch')
  
  await navigationPromise
  
  await page.waitForSelector('.container > .container-left > .anime-banner > .ab-nav > .active')
  await page.click('.container > .container-left > .anime-banner > .ab-nav > .active')
  
  await page.waitForSelector('.container > .container-left > .anime-banner > .ab-nav > .active')
  await page.click('.container > .container-left > .anime-banner > .ab-nav > .active')
  await page.type('.container > .container-left > .anime-banner > .ab-nav > .active',"food wars")
  await page.waitForSelector('#AutocompleteContainter_b74a7 > .autocomplete-w1 > #Autocomplete_b74a7 > .selected > strong')
  await page.click('#AutocompleteContainter_b74a7 > .autocomplete-w1 > #Autocomplete_b74a7 > .selected > strong')
  
  await navigationPromise
  
  await page.waitForSelector('.container-left > .left-left > .anime-list > li:nth-child(1) > a')
  await page.click('.container-left > .left-left > .anime-list > li:nth-child(1) > a')
  
  await navigationPromise
  
  await page.waitForSelector('#Movie > #an_player > .jw-controls > .jw-display-icon-container > .jw-icon')
  await page.click('#Movie > #an_player > .jw-controls > .jw-display-icon-container > .jw-icon')
  
  await page.waitForSelector('#an_player_googima > #an_player_ad > div > div > img:nth-child(2)')
  await page.click('#an_player_googima > #an_player_ad > div > div > img:nth-child(2)')
  
  await browser.close()
})()