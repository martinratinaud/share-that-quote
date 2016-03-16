import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import QuoteList from './QuoteList.jsx';
import Footer from './Footer.jsx';

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.quotes };
  }

  render() {
    return (
      <div className="quoteBox">
        <AppBar title="Quotes"
          showMenuIconButton={false}
        />
      <QuoteList quotes={ this.state.data } />
        <Footer />
      </div>
    );
  }
}

QuoteBox.propTypes = {
  quotes: React.PropTypes.array
};

export default QuoteBox;
