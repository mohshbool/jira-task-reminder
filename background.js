chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, currTab) {
    if (changeInfo.status === 'complete') {
      const { title, url } = currTab;  
      if (/agile board/i.test(title)
      && /https:\/\/[a-z-_]+\.atlassian\.net\/secure\/RapidBoard\.jspa\?rapidView=\d+&projectKey=\w+/i.test(url)) {
        chrome.tabs.executeScript(null, {
          file: 'script.js'
        });
      }
    }
  });
});