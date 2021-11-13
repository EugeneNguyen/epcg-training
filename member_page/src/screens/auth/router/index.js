import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import LoginScreen from "../login";

export default function RouteTgAuth() {
  return (
    <Switch>
      <Route path="/" exact>
        <LoginScreen/>
      </Route>
      <Redirect to="/"/>
    </Switch>
  );
}