// @flow

import React from 'react';
import { render } from 'react-dom';
import App from './App';

// This is the entry point, so it couldn't be hot-reloaded if something had
// changed! Therefore, we JUST have this as our entry point now, and even the
// landing page code lives in App.jsx. This will also be important for things
// like server-side-rendering.

// This is also the place where ONLY browser code will live because it won't be
// in Node (that only gets the pieces, this is just rendering the app.)

const appContainer = document.getElementById('app');

if (appContainer == null) {
  throw new Error('No AppContainer element!');
}

// Turn this into a function
const renderApp = () => {
  render(<App />, appContainer);
};

// Only call it once
renderApp();

// If hot-module replacement is enabled (only in dev!). Then, every time that
// App has changed, re-render the *entire* app. Everything else gets taken care
// of by Babel. `module` comes from webpack
if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}
