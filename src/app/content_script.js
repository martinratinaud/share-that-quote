/* global chrome, detectedlanguage */
import QuoteParser from '../lib/quote-parser.js';

const quotes = QuoteParser.extractQuotes(
  document.querySelector('html').innerHTML,
  detectedlanguage
);

// Send a message containing the page details back to the event page
chrome.runtime.sendMessage({
  title: quotes.length,
  quotes,
});


function findStringInPage(request, sender, sendResponse) {
  window.find(request.search, true, true, true);
  sendResponse();
}

chrome.extension.onMessage.removeListener(findStringInPage);

if (!chrome.extension.onMessage.hasListeners()) {
  chrome.runtime.onMessage.addListener(findStringInPage);
}
