/**
 * Root component.
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './home/Home';

const App = () => (
  <>
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
    <ToastContainer />
  </>
);

export default App;
