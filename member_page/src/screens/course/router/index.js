import React, {lazy, Suspense} from "react";
import {Route, Switch} from "react-router-dom";

const CourseScreen = lazy(() => import('../course'));

export default function RouteCourse() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/course/:id" exact>
          <CourseScreen/>
        </Route>
      </Switch>
    </Suspense>
  );
}