import Parser from 'quote-parser';
import qs from 'qs';
import $ from 'cheerio';
import _ from 'lodash';

const DEFAULT_LANGUAGE = 'en';

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
