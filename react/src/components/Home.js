// @flow

import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import Favicon from 'react-favicon';
import { ColorList } from './ColorList';
import { CharacterList } from './CharacterList';

const styles = {
  button: {
    height: '200px',
    width: '200px',
  },
  label: {
    display: 'block',
  },
  input: {
    border: '1px solid #aaa',
    borderRadius: '5px',
    boxShadow: 'inset 1px 1px 3px #ccc',
    color: '#555',
    display: 'block',
    fontSize: '24px',
    fontStyle: 'italic',
    fontFamily: 'Georgia, serif',
    fontWeight: 'bold',
    height: '3rem',
    lineHeight: '3rem',
    margin: '.5rem auto 2rem',
    textAlign: 'center',
    width: '40%',
  },
  pageTitle: {
    color: '#fff',
    fontFamily: 'sans-serif',
    fontSize: '100px',
    opacity: '.4',
    textShadow: [
      [ '3px','3px',0,'#000' ],
      [ '-1px','-1px',0,'#000' ],
      [ '1px','-1px',0,'#000' ],
      [ '-1px','1px',0,'#000' ],
      [ '1px','1px',0,'#000' ],
    ],
    // backgroundColor: '<?php echo $color', ?>',
    padding: '1rem 0 2rem',
    margin: '.5rem auto 3rem',
  },
  root: {
    backgroundColor: '#eee',
    textAlign: 'center',
  },
  section: {
    padding: '1rem 2rem 2rem',
  }
};

const definitions = {
  defaults: {
    text: 'Default',
    character: 'left-arrow',
  },
  characters: {
    check: '✓',
    x: '✘',
    ellipsis: '…',
    'right-arrow': '→',
    'left-arrow': '←',
    exclamation: '!',
    question: '?',
    asterisk: '∗',
  },
  colors: {
    none: 'transparent',
    // aqua: 'aqua',
    black: '#888',
    // blue: 'blue',
    // fuchsia: 'fuchsia',
    gray: 'silver',
    // green: 'green',
    // lime: 'lime',
    // maroon: 'maroon',
    // navy: 'navy',
    // olive: 'olive',
    // purple: 'purple',
    red: 'red',
    // silver: 'silver',
    // teal: 'teal',
    white: 'white',
    yellow: 'yellow',
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

  getQuery(location, setQuery = false, history) {
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
    if (setQuery) this.setQuery(query, history);
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

  setQuery(query, history) {
    if (!query) query = this.state.query;
    let queryString = typeof query === 'string' ? query : '';
    let queryParts = [];
    if (typeof query === 'object') {
      const keys = Object.keys(query);
      keys.map((key) => {
        if (this.state.query[key]) {
          queryParts.push(`${key}=${this.state.query[key]}`);
        }
      });
      queryString = `?${queryParts.join('&')}`;
    }
    this.props.history.push(queryString);
  };

  handleColorButtonClick = (e) => {
    e.persist()
    this.setState(prevState => ({
      query: {
        color: e.target.innerText,
        text: prevState.query.text,
        character: prevState.query.character,
      }
    }), this.setQuery);
  };

  handleCharacterButtonClick = (e) => {
    e.persist()
    this.setState(prevState => ({
      query: {
        color: prevState.query.color,
        text: prevState.query.text,
        character: e.target.value,
      }
    }), this.setQuery);
  };

  handleTextChange = (e) => {
    e.persist()
    this.setState(prevState => ({
      query: {
        color: prevState.query.color,
        text: e.target.value,
        character: prevState.query.character,
      }
    }), this.setQuery);
  };

  componentDidMount() {
    console.log('Home props', this.props);
    const { history, location } = this.props;
    this.getQuery(location, true, history);
  };

  render() {
    function backgroundColor(color) {
      return {
        backgroundColor: color,
      }
    }
    const { classes } = this.props;
    document.title = `${definitions.characters[this.state.query.character]} ${decodeURI(this.state.query.text)}`;
    return (
      <div className={classes.root}>
        <Favicon url={`/images/${this.state.query.character}-${this.state.query.color}.png`} />
        <h1 className={classes.pageTitle} style={backgroundColor(this.state.query.color)}>
          <span className={classes.icon}>
            {definitions.characters[this.state.query.character]}
          </span> {decodeURI(this.state.query.text)}
        </h1>
        <section className={classes.section}>
          <label className={classes.label} htmlFor="textInput">Tab Text</label>
          <input
            className={classes.input}
            value={decodeURI(this.state.query.text)}
            onChange={this.handleTextChange}
            type="text"
            id="textInput"
          />
        </section>
        <section className={classes.section}>
          <label className={classes.label}>Select Color</label>
          <ColorList data={definitions.colors} onClick={this.handleColorButtonClick} />
        </section>
        <section className={classes.section}>
          <label className={classes.label}>Select Character</label>
          <CharacterList data={definitions.characters} onClick={this.handleCharacterButtonClick} />
        </section>
      </div>
    );
  }
}

Home = injectSheet(styles)(Home);

export { Home };
