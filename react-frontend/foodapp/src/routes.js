//credit to https://stackoverflow.com/questions/41956465/how-to-create-multiple-page-app-using-react
import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Import all page components here
 */
import App from '.App';
import CustomerLanding from './LandingPage';
//import SomePage from './components/SomePage';
//import SomeOtherPage from './components/SomeOtherPage';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={App} />
    <Route path="/some/where" component={CustomerLanding} />
    <Route path="/some/otherpage" component={SomeOtherPage} />
  </Route>
);