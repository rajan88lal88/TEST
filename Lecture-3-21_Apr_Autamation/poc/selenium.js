require("chromedriver");
let fs=require("fs");
let swd=require("selenium-webdriver");
// let credential=require("C:\\Users\\rajan\\OneDrive\\College\\PEP_CODING\\TPP\\Lecture-3-21_Apr_Autamation\\poc\\credential.json")
let bldr=new swd.Builder();
let credentialfile=process.argv[2];
let metadatafile=process.argv[3];
let driver=bldr.forBrowser("chrome").build();
fs.promises.readFile(credentialfile).then(function(file){
    credential=JSON.parse(file);
    driver.get("https://www.pepcoding.com/login")
.then(function(){
    //searching email and password field
    let emailpromise=driver.findElement(swd.By.css("input[type=email]"))
    let passwordpromise=driver.findElement(swd.By.css("input[type=password]"));
    return Promise.all([emailpromise,passwordpromise]);
}).then(function(emailpasswordpromises){
    //entering email and password
    let sendemailpromise=emailpasswordpromises[0].sendKeys(credential.username);
    let sendpasswordpromise=emailpasswordpromises[1].sendKeys(credential.password);
    console.log("Entered email and password");
    return Promise.all([sendemailpromise,sendpasswordpromise]);
}).then(function(){
    //clicking login button
    let buttonclickpromise=driver.findElement(swd.By.css("button[type=submit]"));
    return buttonclickpromise;
}).then(function(buttonclickpromise){
    let buttonclick=buttonclickpromise.click();
    console.log("login clicked");
    //opened the home page
}).then(function(){
    //waiting for resource to load
    let resourceloadpromise=driver.wait(swd.until.elementLocated(swd.By.css(".resource a")));
    return resourceloadpromise;
}).then(function(){
    //selecting resource element
    let resourceselectpromise=driver.findElement(swd.By.css(".resource a"));
    return resourceselectpromise;
}).then(function(resourceselected){
    //finding link of resources
    let resourcelinkpromise=resourceselected.getAttribute("href");
    return resourcelinkpromise;
}).then(function(resourcelinkpromise){
    //goto resources page
    console.log(resourcelinkpromise);
    let navigatetoresources=driver.get(resourcelinkpromise);
    return navigatetoresources;
}).then(function(){
    //select site overlay
    let selectsiteoverlay=driver.findElement(swd.By.css("#siteOverlay"));
    return selectsiteoverlay;
}).then(function(selectsiteoverlay){
    //remove overlay
    let removeoverlaypromise=driver.wait(swd.until.elementIsNotVisible(selectsiteoverlay),10000);
    return removeoverlaypromise;
}).then(function(){
    //selecting course
    let selectcoursepromise=driver.findElement(swd.By.css("#courseCard33"));
    return selectcoursepromise;
}).then(function(selectcoursepromise){
    //click on course
    let clickcourcepromise=selectcoursepromise.click();
    console.log("clicked on course");
    return clickcourcepromise;
}).then(function(){
    //finding all modules
    let findallmodulepromise=driver.findElements(swd.By.css(".lis.tab"));
    return findallmodulepromise;
}).then(function(modules){
    console.log(modules.length);
})









.catch(function(err){
    console.log(err);

})
})