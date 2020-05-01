let puppeteer=require("puppeteer");
let cFile=process.argv[2];
let fs=require("fs");

(async function (){
    const browser=await puppeteer.launch({
        headless:false,
        args:["--incognito"]
    })
    let pages=await browser.pages();
    let page=pages[0];
    let credentials=await fs.promises.readFile(cFile);
    let {url,password,username}=JSON.parse(credentials);
    await page.goto(url,{waitUntil:"networkidle0"});

    await page.type("#input-1",username);
    await page.type("#input-2",password);
    await page.click("button[data-analytics=LoginPassword]");

    await page.waitForNavigation({waitUntil:"networkidle0"});
    await page.waitForSelector("a[data-analytics=NavBarProfileDropDown]",{visible:true});
    await page.click("a[data-analytics=NavBarProfileDropDown]");
    await page.click("a[data-analytics=NavBarProfileDropDownAdministration]");
    await waitForLoader(page);
    console.log("fetched adminstration page\n");
    
    await page.click("a[href=//administration//challenges]");
    
    let managePURL=await page.url();
    //getting questions

    let questionIDx=0;
    while(true){
        let ques=await getQuesEle(page,questionIDx,managePURL);
        if(ques==null){
            console.log("all questions fetched");
            return;
        }
        // await handleQuestion(page,ques,process.argv[3]);
        questionIDx++;
    }
})()


async function getQuesEle(page,questionIDx,managePURL){
    let pageIDx=Math.floor(questionIDx/10);  // 10 questions on a page
    let pageQuesIDx=questionIDx%10;

    console.log(pageIDx+":"+pageQuesIDx);

    await page.goto(managePURL);
    await waitForLoader(page);

    await page.waitForSelector(".pagination ul li",{visible:true});
    let paginations=await page.$$(".pagination ul li");
    let nextButton=paginations[paginations.length-2];


    let className=await page.evaluate(function (ele){
        return ele.getAttribute("class");
    },nextButton);

    for(let i=0;i<pageIDx;i++){
        if(className=="disabled"){
            return null;
        }
        await page.waitForSelector(".pagination ul li",{visible:true});

        paginations=await page.$$(".pagination ul li");
        nextButton=paginations[paginations.length-2];

        className=await page.evaluate(function(ele){
            return ele.getAttribute("class")
        },nextButton);
    }

    let challengeList=await page.$$(".backbone.block-center");
    if (challengeList.length[pageIDx]){
        return challengeList[pageIDx];
    }
    else{
        return null;
    }
}

async function waitForLoader(page){
    await page.waitForSelector("#ajax-msg",{visible:false});
}
