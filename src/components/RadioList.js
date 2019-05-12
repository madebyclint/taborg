import React, { PureComponent } from 'react';
import forEach from 'lodash/forEach';

class RadioList extends PureComponent {
  render() {
    console.log('Button props', this.props);
    const { data, onClick } = this.props;
    const buttons = [];
    forEach(data, (value, key) => {
      buttons.push(
        <button type="button" key={key} onClick={onClick} value={value}>
          {key}
        </button>
      );
    });
    return buttons.map(item => {
      return item;
    });
  }
}

export { RadioList };