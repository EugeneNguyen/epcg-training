import React, {lazy, Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

const LoginScreen = lazy(() => import('../login'));
const ChangePasswordScreen = lazy(() => import('../change_password'));

export default function RouteTgAuth({loggedIn = false}) {
  if (loggedIn) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/profile/changePassword" exact>
            <ChangePasswordScreen/>
          </Route>
        </Switch>
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact>
            <LoginScreen/>
          </Route>
          <Redirect to="/"/>
        </Switch>
      </Suspense>
    );
  }
}