import Parser from 'quote-parser';
import qs from 'qs';
import $ from 'cheerio';
import _ from 'lodash';

const DEFAULT_LANGUAGE = 'en';

const pabloUrl = 'https://buffer.com/pablo';
const entipicUrl = 'http://cdn.entipic.com/en';
const searchAuthorUrl = 'http://www.google.com';

function getQuoteText(element) {
  return element.text;
}

function getQuoteAuthor(element) {
  return element.author || (element.name && element.name.text);
}

function getQuotePabloUrl(element) {
  const queryString = qs.stringify({
    utm_campaign: 'share_that_quote_extension',
    text: `${getQuoteText(element)}\r\n - ${getQuoteAuthor(element)}`
  });
  return `${pabloUrl}?${queryString}`;
}

function getQuotePictureUrl(element) {
  const entipicAuthorName = _.kebabCase(getQuoteAuthor(element));

  return `${entipicUrl}/${entipicAuthorName}.jpg`;
}

function getQuoteSearchAuthorUrl(element) {
  const queryString = qs.stringify({
    q: getQuoteAuthor(element)
  });

  return `${searchAuthorUrl}?${queryString}`;
}


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
    postProcessedQuotes[index].pabloUrl = getQuotePabloUrl(element);
    postProcessedQuotes[index].avatarUrl = getQuotePictureUrl(element);
    postProcessedQuotes[index].searchAuthorUrl = getQuoteSearchAuthorUrl(element);
  });

  return postProcessedQuotes;
}

function extractQuotes(html, lang) {
  const t = $.load(html)('body');
  let quotes = [];

  try {
    // remove all scripts from the innerHTML as we do not want to search in them
    t.find('script').remove();
    quotes = Parser.parse(t.text(), lang || DEFAULT_LANGUAGE);
  } catch (e) {
    // Obviously language is not supported, try with default language
    console.warn(e); // eslint-disable-line
    quotes = Parser.parse(t.text(), DEFAULT_LANGUAGE);
  }

  return postProcessQuotes(quotes);
}


module.exports = {
  extractQuotes
};
