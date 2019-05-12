import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import forEach from 'lodash/forEach';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { styles } from './Button.styles';

class ColorList extends PureComponent {
  render() {
    function backgroundColor(color, contrastColor) {
      return {
        backgroundColor: color,
        color: contrastColor === 'dark' ? '#000' : '#fff',
      }
    }
    // console.log('Button props', this.props);
    const { classes, className, current, data, onClick } = this.props;
    const buttons = [];
    let colorValue = '';
    forEach(data, (value, key) => {
      colorValue = value.hexOverride ? value.hexOverride : value.name;
      buttons.push(
        <Button
          className={classNames(classes.root, className, current === value.name ? classes.active : null)}
          key={key}
          onClick={onClick}
          size="large"
          style={backgroundColor(colorValue, value.textColor)}
          value={value.name}
          variant="outlined"
        >
          {key}
        </Button>
      );
    });
    return buttons.map(item => {
      return item;
    });
  }
}

ColorList = withStyles(styles)(ColorList);

export { ColorList };