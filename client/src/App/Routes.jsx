import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Project from '../Pages/Project';
import PageError from '../shared/components/PageError';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import MyProjects from '../Pages/MyProjects';
import UserAccount from '../Pages/Account';
import ForgotPassword from '../Pages/ForgotPassword';
import ResetPassword from '../Pages/ResetPassword';
import ProtectedRoute from '../shared/components/ProtectedRoute';

const Routes = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Redirect exact from="/" to="/signin" />
        <Route path="/signin" component={SignIn} />

        <Route path="/forgot_pass" component={ForgotPassword} />
        <Route path="/reset_pass/:token" component={ResetPassword} />
        <Route path="/signup" component={SignUp} />
        <ProtectedRoute path="/projects" component={MyProjects} />
        <ProtectedRoute path="/account" component={UserAccount} />
        <ProtectedRoute path="/project/:id" component={Project} />
        <Route component={PageError} />
      </Switch>
    </Router>
  );
};

export default Routes;
