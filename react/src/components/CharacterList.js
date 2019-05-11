import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import forEach from 'lodash/forEach';
import { styles as buttonStyles } from './Button.styles';

const styles = {
  root: {
    extend: buttonStyles,
  }
};

class CharacterList extends PureComponent {
  render() {
    // console.log('Button props', this.props);
    const { current, data, onClick } = this.props;
    const buttons = [];
    const { classes } = this.props;
    forEach(data, (value, key) => {
      buttons.push(
        <button className={`${classes.root} ${current === key ? 'active' : ''}`} type="button" key={key} onClick={onClick} value={key}>
          {value} ({key})
        </button>
      );
    });
    return buttons.map(item => {
      return item;
    });
  }
}

CharacterList = injectSheet(styles)(CharacterList);

export { CharacterList };