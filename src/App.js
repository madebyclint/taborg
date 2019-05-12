import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Home } from './components/Home';
import { Page } from './components/Page';

class App extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <Router>
        <Page>
          {/* <div>
            <Link to="/">
              <button type="button">Home</button>
            </Link>
          </div> */}
          <div>
            <Route
              exact
              path="/"
              render={props => <Home {...props} />}
            />
          </div>
        </Page>
      </Router>
    );
  }
}

export { App };
