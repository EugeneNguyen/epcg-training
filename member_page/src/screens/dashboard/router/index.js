import React, {lazy, Suspense} from "react";
import {Route, Switch} from "react-router-dom";

const DashboardScreen = lazy(() => import('../dashboard'));

export default function RouteDashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/dashboard" exact>
          <DashboardScreen/>
        </Route>
      </Switch>
    </Suspense>
  );
}