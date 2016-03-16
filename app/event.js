/* global chrome */
// This function is called onload in the popup code
function getPageDetails(callback) {
  // Inject the content script into the current page
  //
  //
  chrome.tabs.getSelected(null, (tab) => {
    chrome.tabs.detectLanguage(tab.id, (language) => {
      chrome.tabs.executeScript(null, { code: `var detectedlanguage = "${language}";` }, () => {
        chrome.tabs.executeScript(null, { file: 'content_script.js' }, () => {
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
  chrome.runtime.onMessage.addListener((message) => {
    // Call the callback function
    callback(message);
  });
}

chrome.browserAction.setBadgeBackgroundColor({ color: '#333333' });

function getAndSetRelevantData() {
  getPageDetails((data) => {
    chrome.browserAction.setBadgeText({
      text: data.quotes.length ? data.quotes.length.toString() : ''
    });
  });
}

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (!tab.url) {
      return;
    }

    getAndSetRelevantData();
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (!changeInfo.url) {
    return;
  }

  getAndSetRelevantData();
});
