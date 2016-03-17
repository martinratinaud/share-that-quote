/* global chrome */
import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import IconButton from 'material-ui/lib/icon-button';
import Avatar from 'material-ui/lib/avatar';

const PabloIcon = () => (
  /* eslint-disable max-len */
  <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="40px" height="40px" viewBox="0 0 128.000000 128.000000" preserveAspectRatio="xMidYMid meet">
    <metadata>Created by potrace 1.10, written by Peter Selinger 2001-2011</metadata>
    <g transform="translate(0.000000,78.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none">
      <path d="M245 722c-142-60-233-203-223-351 3-36 10-75 15-86 6-11 19-38 29-60 27-55 90-117 154-150 49-24 66-27 150-28 83 0 101 3 145 26 78 40 140 105 174 182 26 60 30 229 6 261-21 28-18 52 10 86 23 28 24 31 9 54-33 49-56 34-158-103-96-129-110-158-80-170 12-4 33 11 71 50 30 32 58 57 61 57 4 0 12-8 18-18 47-75 0-228-92-298-43-33-126-64-169-63-84 2-196 74-238 152-18 35-22 58-22 132 1 96 14 129 76 195 76 79 202 102 297 52 36-18 42-19 61-6 37 26 27 52-31 79-44 20-68 25-138 24-56 0-99-6-125-17z" />
      <path d="M348 326c-18-24-46-52-62-61l-29-18 24-18c29-22 90-24 128-4 27 14 61 68 61 98 0 18-42 47-69 47-12 0-33-18-53-44z" />
    </g>
  </svg>
  /* eslint-enable max-len */
);

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
    this._handleShare = this._handleShare.bind(this);
    this._handleSearchAuthor = this._handleSearchAuthor.bind(this);
  }
  _handleClick() {
    if (!chrome.tabs) {
      return console.log('You\'re not in a chrome extension');//eslint-disable-line
    }

    return chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { search: this.props.children }, () => ('found'));
    });
  }
  _handleShare() {
    window.open(this.props['pablo-url']);
  }
  _handleSearchAuthor() {
    window.open(this.props['search-author-url']);
  }
  render() {
    return (
      <ListItem
        primaryText={this.props.children}
        secondaryText={this.props.author}
        onClick={this._handleClick}
        leftAvatar={
          <Avatar src={this.props['avatar-url']} onClick={this._handleSearchAuthor} />
        }
        rightIconButton={
          <IconButton
            tooltip="Share with pablo"
            tooltipPosition="bottom-left"
            onClick={this._handleShare}
          >
            <PabloIcon />
          </IconButton>}

      />
    );
  }
}

Quote.propTypes = {
  'pablo-url': React.PropTypes.string,
  'avatar-url': React.PropTypes.string,
  'search-author-url': React.PropTypes.string,
  author: React.PropTypes.string,
  children: React.PropTypes.string
};

export default Quote;
