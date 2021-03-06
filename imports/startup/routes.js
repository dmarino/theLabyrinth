import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import App from '../ui/containers/App.jsx';
import Inicio from '../ui/components/Inicio.jsx';

const browserHistory = createBrowserHistory();
 
export const renderRoutes = () => (
  <Router history={browserHistory}>
      <div>
            <Route exact path="/" component={Inicio}/>
            <Route path ="/inicio" component={App}/>
      </div>
  </Router>
);