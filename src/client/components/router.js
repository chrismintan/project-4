import React from 'react';
import {Route, Router} from 'react-router-dom';
import App from '../App';
import Home from './home';
import history from './history';

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>
        <Route path="/" render={(props) => <App {...props} />} />
        <Route path="/home" render={(props) => <Home {...props} />} />
      </div>
    </Router>
  );
};
