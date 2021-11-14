import React from "react";
import {Route, Switch} from "react-router-dom";
import CourseScreen from "../course";

export default function RouteCourse() {
  return (
    <Switch>
      <Route path="/course/:id" exact>
        <CourseScreen/>
      </Route>
    </Switch>
  );
}