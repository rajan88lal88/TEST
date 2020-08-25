// console.log("this is background");
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender);
        if (request.greeting == "hello") {
console.log("Recieved from content");
            sendResponse({ farewell: "goodbye" });
        }
    })