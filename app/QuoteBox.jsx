import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import QuoteList from './QuoteList.jsx';
import Footer from './Footer.jsx';

const QuoteBox = React.createClass({
  propTypes: {
    quotes: React.PropTypes.array
  },

  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    this.setState({
      data: this.props.quotes
    });
  },

  render: function() {
    return (
      <div className="quoteBox">
        <AppBar title="Quotes"
                showMenuIconButton={false}/>
        <QuoteList data={this.state.data} />
        <Footer />
      </div>
    );
  }
});

export default QuoteBox;
