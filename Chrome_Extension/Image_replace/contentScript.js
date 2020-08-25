// console.log("this is test extension");
function relplaceImg(){
let imgPath=[
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img4.jpg",
    "images/img5.jpg"
]
let allImgOnPage=document.querySelectorAll("img");
for(let i=0;i<allImgOnPage.length;i++){
    let idx=Math.floor(Math.random()*imgPath.length);
    // let idx=0;
    let fullPath=chrome.extension.getURL(imgPath[idx]);
    console.log(fullPath);
    allImgOnPage[i].src=fullPath;
}
}
let message = { greeting: "hello" };

chrome.runtime.sendMessage(message, function (response) {
    console.log("recieved from background.js")
    console.log(response)
});
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender);
        // if (request.greeting == "hello") {
        //     console.log("Recieved from popup");
        // }
        relplaceImg()
    })