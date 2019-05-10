import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import forEach from 'lodash/forEach';

const buttonStyles = {
  border: '1px solid #888',
  borderRadius: '3px',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  margin: '10px',
  padding: '1rem 5rem',
};

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
    console.log('Button props', this.props);
    const { data, onClick } = this.props;
    const buttons = [];
    const { classes } = this.props;
    let colorValue = '';
    forEach(data, (value, key) => {
      colorValue = value.hexOverride ? value.hexOverride : value.name;
      console.log('colorValue', colorValue);
      buttons.push(
        <button className={classes.root} style={backgroundColor(colorValue, value.textColor)} type="button" key={key} onClick={onClick} value={value.name}>
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