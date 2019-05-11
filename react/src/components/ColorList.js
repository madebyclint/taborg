import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import forEach from 'lodash/forEach';
import { styles as buttonStyles } from './Button.styles';

const styles = {
  root: {
    extend: buttonStyles,
  }
};

class ColorList extends PureComponent {
  render() {
    function backgroundColor(color, contrastColor) {
      return {
        backgroundColor: color,
        color: contrastColor === 'dark' ? '#000' : '#fff',
      }
    }
    // console.log('Button props', this.props);
    const { current, data, onClick } = this.props;
    const buttons = [];
    const { classes } = this.props;
    let colorValue = '';
    forEach(data, (value, key) => {
      colorValue = value.hexOverride ? value.hexOverride : value.name;
      buttons.push(
        <button className={`${classes.root} ${current === value.name ? 'active' : ''}`} style={backgroundColor(colorValue, value.textColor)} type="button" key={key} onClick={onClick} value={value.name}>
          {key}
        </button>
      );
    });
    return buttons.map(item => {
      return item;
    });
  }
}

ColorList = injectSheet(styles)(ColorList);

export { ColorList };