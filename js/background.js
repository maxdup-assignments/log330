/* Regex-pattern to check URLs against. 
   It matches URLs like: http[s]://[...]stackoverflow.com[...] */

/* A function creator for callbacks */
function doStuffWithDOM(domContent) {
    console.log("I received the following DOM content:\n" + domContent);
}

/* When the browser-action button is clicked... */
chrome.browserAction.onClicked.addListener(function(tab) {
    /*...check the URL of the active tab against our pattern and... */
    chrome.tabs.sendMessage(tab.id, { text: "report_back" },
                            doStuffWithDOM);
});