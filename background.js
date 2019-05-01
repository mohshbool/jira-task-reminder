chrome.runtime.onInstalled.addListener(function() {
  let tab = {};
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, currTab) {
    console.log(changeInfo)
    if (changeInfo.status !== 'complete') {
      const { title, url } = currTab;  
      if (/agile board/i.test(title)
      && /https:\/\/[a-z-_]+\.atlassian\.net\/secure\/RapidBoard\.jspa\?rapidView=\d+&projectKey=\w+/i.test(url)) {
        tab = currTab;
      }
    }
  });
  chrome.tabs.onRemoved.addListener(function() {
    if (tab.url) {
      chrome.tabs.executeScript(null, {
        file: 'script.js'
      });
    }
    delete tab;
  });
});