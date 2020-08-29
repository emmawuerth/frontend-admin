import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Outer from '../Templates/Outer';
import {
  Login,
  Register,
  ResetPassword,
  ComingSoon,
  Maintenance,
} from '../pageListAsync';
// import Application from './Application';
class Auth extends React.Component {
  render() {
    return (
      <Outer>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/maintenance" component={Maintenance} />
          <Route path="/coming-soon" component={ComingSoon} />
          {/* <Route path="/" component={Application} /> */}
        </Switch>
      </Outer>
    );
  }
}

export default Auth;
