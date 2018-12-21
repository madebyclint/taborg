import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import { Home } from './components/Home';

const styles = {
  root: {
    
  },
};

class App extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div className={classes.root}>
          <div>
            <Link to="/">
              <button type="button">Home</button>
            </Link>
          </div>
          <div>
            <Route
              exact
              path="/"
              render={props => <Home {...props} />}
            />
          </div>
        </div>
      </Router>
    );
  }
}

App = injectSheet(styles)(App);

export { App };
