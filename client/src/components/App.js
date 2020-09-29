import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

// NOTE: the course suggests using:
// import * as actions from '../actions';
// but for some reason I was getting an undefined error on "actions" in the useEffect
import { fetchUser } from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './surveys/Dashboard';
import SurveyNew from './surveys/SurveyNew';

const App = ({ fetchUser }) => {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/surveys" component={Dashboard} />
        <Route exact path="/surveys/new" component={SurveyNew} />
      </BrowserRouter>
    </div>
  );
};

export default connect(null, { fetchUser })(App);
