import React from 'react';
import List from 'material-ui/lib/lists/list';
import Quote from './Quote.jsx';
import FontAwesome from 'react-fontawesome';

const QuoteList = React.createClass({
  render: function() {
    let styles = {
      noData : {
        padding: 30,
        color: "#666"
      },
      arrow: {
        marginTop: 30,
        display: 'block',
        textAlign: 'center',
        fontSize: 30
      }
    };
    let quoteNodes = this.props.data.map(function(quote) {
      return (
        <Quote author={quote.name.text} key={quote.index} url={quote.pabloUrl} pablo-url={quote.pabloUrl} avatar-url={quote.avatarUrl}>
          {quote.text}
        </Quote>
      );
    });

    if(!quoteNodes.length) {
      return (
        <div style={styles.noData}>
          Unfortunately, there are no quotes inside this page<br/>
          But while you're here, why don't you check out those
          <FontAwesome style={styles.arrow} name='long-arrow-down' />
        </div>
      )
    }

    return (
      <List className="quoteList">
        {quoteNodes}
      </List>
    );
  }
});

export default QuoteList;
