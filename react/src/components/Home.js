// @flow

import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';

const styles = {
  button: {
    height: '200px',
    width: '200px',
  },
};

const definitions = {
  defaults: {
    text: 'Default',
    character: 'left-arrow',
  }
};

const Character = (props) => {
  const code = props.char;
  switch(code) {
    case 'check':
      return <span>&#10003;</span>;
    case 'x':
      return <span>&#10008;</span>;
    case 'ellipsis':
      return <span>&#8230;</span>;
    case 'right-arrow':
      return <span>&#8594;</span>;
    case 'left-arrow':
      return <span>&#8592;</span>;
    case 'exclamation':
      return <span>&#33;</span>;
    case 'question':
      return <span>&#63;</span>;
    case 'asterisk':
      return <span>&#8727;</span>;
    default:
      return '';
  }
};

class Home extends PureComponent {
  state = {
    query: {
      text: 'Default',
      character: 'left-arrow',
    },
  };

  buildQuery(definition) {
    return `?text=${definition.text}&character=${definition.character}`;
  }

  getQuery(location, setQuery = false) {
    const isAlreadySet = location.search.length >= 1;
    if (isAlreadySet) {
      const queryParts = this.parseQuery(location.search);
      this.setState({
        query: {
          ...queryParts
        }
      })
      return location.search;
    }
    const query = this.buildQuery(this.state.query);
    if (setQuery) window.location.search = query;
    return query;
  }

  parseQuery(queryString) {
    const queries = queryString.substr(1).split('&');
    const output = {};
    queries.map(query => {
      const parts = query.split('=');
      output[parts[0]] = parts[1];
      return false;
    });
    return output;
  };

  componentDidMount() {
    const { location } = this.props;
    this.getQuery(location, true);
  };

  render() {
    return (
      <div>
        Current setup is: <br />
        text: {this.state.query.text}<br />
        character: {this.state.query.character} <Character char={this.state.query.character} />
      </div>
    );
  }
}

Home = injectSheet(styles)(Home);

export { Home };
