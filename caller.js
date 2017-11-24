function updateCounter(tabId, changeInfo, tabInfo) {
    browser.tabs.sendMessage(tabId, {action:"updateCounter", tab:tabId});
}

function updateTabCounter(tab, changeInfo, tabInfo) {
    updateCounter(tab.tabId, changeInfo, tabInfo)
}

function setCounter(tabId, counter) {
        var color = "green"; 
        if (counter >= 1 && counter <= 3) {
            color = "orange";
        } else if (counter >= 5) {
            color = "red";
        }
        browser.browserAction.setBadgeBackgroundColor({color: color, tabId: tabId});
        browser.browserAction.setBadgeText({text: counter.toString(), tabId: tabId});
        
}

function handleMessage(request, sender, sendResponse) {
	setCounter(request.tab, request.cybercounter);
}

browser.browserAction.setBadgeBackgroundColor({color: "gray"});
browser.tabs.onUpdated.addListener(updateCounter);
browser.tabs.onActivated.addListener(updateTabCounter);
browser.runtime.onMessage.addListener(handleMessage);
