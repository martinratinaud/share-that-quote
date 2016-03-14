import React from 'react';
import FontAwesome from 'react-fontawesome';

const twitterUrl = "http://www.twitter.com/martinratinaud";
const sideProjectsUrl = "http://www.pikilabs.com";

const Footer = React.createClass({
  render: function() {
    let styles = {
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
    }

    return (
      <div>
        <div style={styles.div}>
          <a style={styles.a} target="_blank" href={twitterUrl}>
            <FontAwesome style={styles.FontAwesome} name='twitter' />
            <span style={styles.span}>Follow me on twitter</span>
          </a>
          <a style={styles.a} target="_blank" href={sideProjectsUrl}>
            <FontAwesome style={styles.FontAwesome} name='rocket' />
            <span style={styles.span}>Side projects</span>
          </a>
        </div>
        <div style={styles.thanks}>and a lot of thanks to <a target='_blank' style={styles.thanks} href="https://github.com/Mitica/quote-parser-js">Mitica</a> for his awesome quote extractor library</div>
      </div>
    );
  }
});

export default Footer;
