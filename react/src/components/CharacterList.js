import React, { PureComponent } from 'react';
import forEach from 'lodash/forEach';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { styles } from './Button.styles';

class CharacterList extends PureComponent {
  render() {
    // console.log('Button props', this.props);
    const { classes, className, current, data, onClick } = this.props;
    const buttons = [];
    forEach(data, (value, key) => {
      buttons.push(
        <Button
          className={classNames(classes.root, className, current === key ? classes.active : null)}
          key={key}
          onClick={onClick}
          size="large"
          value={key}
          variant="outlined"
        >
          {value} ({key})
        </Button>
      );
    });
    return buttons.map(item => {
      return item;
    });
  }
}

CharacterList = withStyles(styles)(CharacterList);

export { CharacterList };