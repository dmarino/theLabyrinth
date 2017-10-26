import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { render } from 'react-dom';

import App from '../ui/App.jsx';

const browserHistory = createBrowserHistory();
 
Meteor.startup(() => {
  render(
  	<Router history={browserHistory}>
  	    <Route path="/" component={App} />
  	</Router>
  	, document.getElementById('render-target'));
});
