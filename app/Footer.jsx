import React from 'react';
import FontAwesome from 'react-fontawesome';

const twitterUrl = 'http://www.twitter.com/martinratinaud';
const sideProjectsUrl = 'http://www.pikilabs.com';
const styles = {
  div: {
    padding: 10,
    display: 'flex',
    justifyContent: 'space-around',
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: '#333',
    textDecoration: 'none'
  },
  a: {
    color: 'white',
    textDecoration: 'none'
  },
  span: {
    display: 'block',
    color: '#CCC',
    fontSize: 11
  },
  FontAwesome: {
    textDecoration: 'none',
    fontSize: 30,
  },
  thanks: {
    backgroundColor: '#333',
    color: '#CCC',
    fontSize: 10,
    padding: 10
  },
  thanks_a: {
    color: '#00bcd4',
  }
};

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { styles };
  }
  render() {
    return (
      <footer>
        <div style={this.state.styles.div}>
          <a style={this.state.styles.a} target="_blank" href={twitterUrl}>
            <FontAwesome style={this.state.styles.FontAwesome} name="twitter" />
            <span style={this.state.styles.span}>Follow me on twitter</span>
          </a>
          <a style={this.state.styles.a} target="_blank" href={sideProjectsUrl}>
            <FontAwesome style={this.state.styles.FontAwesome} name="rocket" />
            <span style={this.state.styles.span}>Side projects</span>
          </a>
        </div>
        <div style={this.state.styles.thanks}>and a lot of thanks to <a target="_blank" style={this.state.styles.thanks_a} href="https://github.com/Mitica/quote-parser-js">Mitica</a> for his awesome quote extractor library</div>
      </footer>
    );
  }
}

export default Footer;
