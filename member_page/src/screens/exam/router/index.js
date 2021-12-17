import React, {lazy, Suspense} from "react";
import {Route, Switch} from "react-router-dom";

const ExamScreen = lazy(() => import('../exam'));

export default function RouteExam() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/exam/:id" exact>
          <ExamScreen/>
        </Route>
      </Switch>
    </Suspense>
  );
}