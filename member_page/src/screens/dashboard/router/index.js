import React from "react";
import {Switch, Route} from "react-router-dom";
import DashboardScreen from "../dashboard";

export default function RouteDashboard() {
  return (
    <Switch>
      <Route path="/" exact>
        <DashboardScreen />
      </Route>
    </Switch>
  );
}