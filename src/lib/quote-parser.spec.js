/* global describe, it, expect */
import QuoteParser from './quote-parser';

describe('Quote Parser', () => {
  it('should parse an HTML document', () => {
    const quotes = QuoteParser.extractQuotes(require('../../test/html-page.js'));

    expect(quotes).to.have.length(5);
  });
});
