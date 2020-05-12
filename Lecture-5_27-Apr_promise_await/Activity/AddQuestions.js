let fs = require("fs");
require("chromedriver");
let swd = require("selenium-webdriver");
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();

let cFile = process.argv[2];
let questionsFile = process.argv[3];
let questions = require("./questions");
(async function () {
  try {
    // login
    await loginHelper();
    // await waitForLoader();
    //dashboard
    let DropDownBtn = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDown]"))
    await DropDownBtn.click();
    console.log("drop down button clicked");
    let adminLinkanchor = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDownAdministration]"));
    await adminLinkanchor.click();
    await waitForLoader();
    let manageTabs = await driver.findElements(swd.By.css(".administration header ul li"));
    await manageTabs[1].click();
    let ManageChallengePage = await driver.getCurrentUrl();
    
    // Json file read
    console.log("Question file read");
    for (let i = 0; i < questions.length; i++) {
      await driver.get(ManageChallengePage)
      await waitForLoader();
      await createNewChallenge(questions[i]);
    }
  } catch (err) {
    console.log(err);
  }
})()

async function createNewChallenge(question) {
  let createChallenge = await driver.findElement(swd.By.css(".btn.btn-green.backbone.pull-right"));
  await createChallenge.click();
  await waitForLoader();
  // opertion => selection ,data entry
  let eSelector = ["#name", "textarea.description", "#problem_statement-container .CodeMirror div textarea", "#input_format-container .CodeMirror textarea", "#constraints-container .CodeMirror textarea", "#output_format-container .CodeMirror textarea", "#tags_tag"];
  let eWillBeselectedPromise = eSelector.map(function (s) {
    return driver.findElement(swd.By.css(s));
  })
  let AllElements = await Promise.all(eWillBeselectedPromise);
  let NameWillAddedPromise = AllElements[0].sendKeys(question["Challenge Name"]);
  let descWillAddedPromise = AllElements[1].sendKeys(question["Description"]);

  await Promise.all([NameWillAddedPromise, descWillAddedPromise]);
  //for editors
  await editorHandler("#problem_statement-container .CodeMirror div", AllElements[2], question["Problem Statement"]);
  await editorHandler("#input_format-container .CodeMirror div", AllElements[3], question["Input Format"]);
  await editorHandler("#constraints-container .CodeMirror div", AllElements[4], question["Constraints"]);
  await editorHandler("#output_format-container .CodeMirror div", AllElements[5], question["Output Format"]);
  // adding tags
  let TagsInput = AllElements[6];
  await TagsInput.sendKeys(question["Tags"]);
  //sending enter key
  await TagsInput.sendKeys(swd.Key.ENTER);
  // submit 
  let submitBtn = await driver.findElement(swd.By.css(".save-challenge.btn.btn-green"))
  await submitBtn.click();

}
async function loginHelper() {
  try {
    await driver.manage().setTimeouts({ implicit:10000, pageLoad:10000 })
    let data = await fs.promises.readFile(cFile);
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
    await button.click();
    // await driver.wait(swd.until.elementIsNotVisible(button));
  }
  catch (err) {
    console.log(err);
  }
}

async function waitForLoader() {
  let loader = await driver.findElement(swd.By.css("#ajax-msg"));
  await driver.wait(swd.until.elementIsNotVisible(loader));
}
async function editorHandler(parentSelector, element, data) {
  let parent = await driver.findElement(swd.By.css(parentSelector));
  // selenium => browser js execute 
  await driver.executeScript("arguments[0].style.height='10px'", parent);
  await element.sendKeys(data);
}
