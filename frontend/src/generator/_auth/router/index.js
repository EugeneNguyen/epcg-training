import React from "react";
import {Switch, Route} from "react-router-dom";
import LoginScreen from "../login";

export default function RouteTgAuth() {
  return (
    <Switch>
      <Route path="/login" exact>
        <LoginScreen />
      </Route>
    </Switch>
  );
}