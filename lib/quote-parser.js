import Parser from 'quote-parser';
import qs from 'qs';
const $ = require('cheerio');
const _ = require('lodash');

const pabloUrl = 'https://buffer.com/pablo';
const entipicUrl = 'http://cdn.entipic.com/en';

/**
 * Once quotes have been extracted
 * Add some metadata to them for later use in UI
 *
 * @param  {Array} quotes the extracted quotes
 * @return {Array}        the quotes with some more metadata
 */
function postProcessQuotes(quotes) {
  const postProcessedQuotes = quotes;

  postProcessedQuotes.forEach((element, index) => {
    const queryString = qs.stringify({
      utm_campaign: 'share_that_quote_extension',
      text: `${element.text}\r\n - ${element.name.text}`
    });

    postProcessedQuotes[index].pabloUrl = `${pabloUrl}?${queryString}`;
    postProcessedQuotes[index].avatarUrl = `${entipicUrl}/${_.kebabCase(element.name.text)}.jpg`;
  });

  return postProcessedQuotes;
}

function extractQuotes(html, lang) {
  const t = $.load(html)('body');
  let quotes = [];

  try {
    quotes = Parser.parse(t.text(), lang || 'en');
  } catch (e) {
    // Obviously language is not supported
    console.warn(e); // eslint-disable-line
    quotes = Parser.parse(t.text(), 'en');
  }

  return postProcessQuotes(quotes);
}


module.exports = {
  extractQuotes
};
