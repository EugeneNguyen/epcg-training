import React, {lazy, Suspense} from "react";
import {Route, Switch} from "react-router-dom";

const ScreenExamAttemptInfo = lazy(() => import('../info'));
const ScreenExamAttemptTake = lazy(() => import('../take'));
const ScreenExamAttemptResult = lazy(() => import('../result'));

export default function RouteExamAttempt() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/exam/attempt/:id" exact>
          <ScreenExamAttemptInfo/>
        </Route>
        <Route path="/exam/attempt/:id/take" exact>
          <ScreenExamAttemptTake/>
        </Route>
        <Route path="/exam/attempt/:id/result" exact>
          <ScreenExamAttemptResult/>
        </Route>
      </Switch>
    </Suspense>
  );
}