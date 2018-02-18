import React from 'react';
import { render } from 'react-dom';
// from React-Router!
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import Search from './Search';

const FourOhFour = () => <h1>404</h1>;

const App = () => (
  <BrowserRouter>
    <div className="app">
      {/* exact means the exact path, not the path and any subpaths */}
      {/* The route is now http://localhost:8080/#/ */}
      {/* What is this /#/? The server is not set up correctly! This is a lazy way to make SPAs */}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/search" component={Search} />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </BrowserRouter>
);

render(<App />, document.getElementById('app'));
