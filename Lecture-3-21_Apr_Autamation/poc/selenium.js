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
    let emailpromise=driver.findElement(swd.By.css("input[type=email]"))
    return emailpromise;
}).then(function(emailpromise){
    let sendemailpromise=emailpromise.sendKeys(credential.username);
}).then(function(){
    console.log("Email Id sent");
    let passwordpromise=driver.findElement(swd.By.css("input[type=password]"));
    return passwordpromise;
}).then(function(passwordpromise){
    let sendpasswordpromise=passwordpromise.sendKeys(credential.password);
}).then(function(){
    let buttonclickpromise=driver.findElement(swd.By.css("button[type=submit]"));
    return buttonclickpromise;
}).then(function(buttonclickpromise){
    let buttonclick=buttonclickpromise.click();
}).catch(function(err){
    console.log(err);

})
})