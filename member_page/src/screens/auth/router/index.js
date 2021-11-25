import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import LoginScreen from "../login";
import ChangePasswordScreen from "../change_password";

export default function RouteTgAuth({loggedIn=false}) {
  if (loggedIn) {
    return (
      <Switch>
        <Route path="/profile/changePassword" exact>
          <ChangePasswordScreen/>
        </Route>
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/" exact>
          <LoginScreen/>
        </Route>
        <Redirect to="/"/>
      </Switch>
    );
  }
}