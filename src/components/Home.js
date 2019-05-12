// @flow

import React, { PureComponent } from 'react';
import Favicon from 'react-favicon';
// // import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { ColorList } from './ColorList';
import { CharacterList } from './CharacterList';
import { styles } from './Home.styles';
import { definitions } from '../data/definitions';
import { withStyles } from '@material-ui/core/styles';

class Home extends PureComponent {
  state = {
    query: {
      color: 'transparent',
      text: 'Default',
      character: 'left-arrow',
      iconTitleToggle: false,
    },
  };

  buildQuery(definition) {
    return `?text=${definition.text}&character=${definition.character}&color=${definition.color}&iconTitleToggle=${definition.iconTitleToggle}`;
  }

  getQuery(location, setQuery = false, history) {
    const isAlreadySet = location.search.length >= 1;
    if (isAlreadySet) {
      const queryParts = this.parseQuery(location.search);
      this.setState((prevState, props) => {
        return {
          query: {
            ...queryParts
          }
        }
      });
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
    const value = e.currentTarget.value;
    e.persist()
    this.setState(prevState => ({
      query: {
        color: value,
        text: prevState.query.text,
        character: prevState.query.character,
        iconTitleToggle: prevState.query.iconTitleToggle,
      }
    }), this.setQuery);
  };

  handleCharacterButtonClick = (e) => {
    const value = e.currentTarget.value;
    e.persist()
    this.setState(prevState => ({
      query: {
        color: prevState.query.color,
        text: prevState.query.text,
        character: value,
        iconTitleToggle: prevState.query.iconTitleToggle,
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
        iconTitleToggle: prevState.query.iconTitleToggle,
      }
    }), this.setQuery);
  };

  handleToggleChange = (e) => {
    const value = e.currentTarget.checked;
    this.setState(prevState => ({
      query: {
        color: prevState.query.color,
        text: prevState.query.text,
        character: prevState.query.character,
        iconTitleToggle: value,
      }
    }), this.setQuery);
  }

  componentDidMount() {
    // console.log('Home props', this.props);
    const { history, location } = this.props;
    this.getQuery(location, true, history);
  };

  render() {
    const { classes } = this.props;
    function backgroundColor(color) {
      color = color || 'transparent';
      const colorValue = definitions.colors[color].hexOverride ? definitions.colors[color].hexOverride : color;
      return {
        backgroundColor: colorValue,
      }
    }
    document.title = `${this.state.query.iconTitleToggle ? definitions.characters[this.state.query.character] : ''} ${decodeURI(this.state.query.text)}`;
    return (
      <div className={classes.root}>
        <Favicon url={`/images/${this.state.query.character}-${this.state.query.color}.png`} />
        <h1 className={classes.pageTitle} style={backgroundColor(this.state.query.color)}>
          <span className={classes.icon}>
            {definitions.characters[this.state.query.character]}
          </span> {decodeURI(this.state.query.text)}
        </h1>
        <section className={classes.section}>
        <TextField
          value={decodeURI(this.state.query.text)}
          onChange={this.handleTextChange}
          type="text"
          id="textInput"
          margin="normal"
          variant="outlined"
          label="Text Title"
          fullWidth
          style={{ margin: '0 16px', maxWidth: '600px' }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.query.iconTitleToggle ? true : false}
              onChange={this.handleToggleChange}
              value="showIconTitle"
            />
          }
          label="Show icon in title"
        />
        </section>
        {/* <Divider variant="middle" /> */}
        <section className={classes.section}>
          <FormLabel>Select Color</FormLabel>
          <div className={classes.listContainer}>
            <ColorList data={definitions.colors} onClick={this.handleColorButtonClick} current={this.state.query.color} />
          </div>
        </section>
        <section className={classes.section}>
          <FormLabel>Select Character</FormLabel>
          <div className={classes.listContainer}>
            <CharacterList data={definitions.characters} onClick={this.handleCharacterButtonClick} current={this.state.query.character} />
          </div>
        </section>
      </div>
    );
  }
}

Home = withStyles(styles)(Home);

export { Home };
