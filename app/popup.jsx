/* global chrome */
import React from 'react';
import ReactDOM from 'react-dom';
import QuoteBox from './QuoteBox.jsx';
import QuoteParser from '../lib/quote-parser.js';
require('font-awesome/css/font-awesome.css');

const env = process.env.NODE_ENV || 'development';

// This callback function is called when the content script has been
// injected and returned its results
function onPageDetailsReceived(pageDetails) {
  const quotes = pageDetails.quotes || [];

  ReactDOM.render(
    <QuoteBox quotes={quotes} />,
    document.getElementById('share-quotes-extension-content')
  );
}

if (env === 'development') {
  const quotes = QuoteParser.extractQuotes(require('../test/test.js'));

  onPageDetailsReceived({ quotes });
} else {
  // When the popup HTML has loaded
  window.addEventListener('load', () => {
    // Get the event page
    chrome.runtime.getBackgroundPage((eventPage) => {
      // Call the getPageInfo function in the event page, passing in
      // our onPageDetailsReceived function as the callback. This injects
      // content.js into the current tab's HTML
      eventPage.getPageDetails(onPageDetailsReceived);
    });
  });
}
