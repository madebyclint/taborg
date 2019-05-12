import React, { PureComponent } from 'react';

class Page extends PureComponent {
  render() {
    const classes = {};
    const { children } = this.props;
    return (
      <div className={classes.root}>
        {children}
      </div>
    );
  };
};

export { Page };