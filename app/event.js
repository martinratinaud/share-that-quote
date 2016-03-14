// This function is called onload in the popup code
function getPageDetails(callback) {
  // Inject the content script into the current page
  //
  //
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.detectLanguage(tab.id, function(language) {
      chrome.tabs.executeScript(null, { code: `var detectedlanguage = "${language}";` }, function() {
        chrome.tabs.executeScript(null, { file: 'content_script.js' }, function() {
          if (chrome.runtime.lastError) {
            chrome.runtime.sendMessage({
              quotes: []
            });
          }
        });
      });
    });
  });


  // Perform the callback when a message is received from the content script
  chrome.runtime.onMessage.addListener(function(message)  {
    // Call the callback function
    callback(message);
  });
}

chrome.browserAction.setBadgeBackgroundColor({color: "#333333"});




function getAndSetRelevantData() {

  getPageDetails(function (data) {
    chrome.browserAction.setBadgeText({
      text : data.quotes.length ? data.quotes.length.toString() : ''
    });
  });
}




chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab){
    if (!tab.url) {
      return;
    }

    getAndSetRelevantData();
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (!changeInfo.url) {
    return;
  }

  getAndSetRelevantData();
});
