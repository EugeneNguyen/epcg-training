import React from "react";
import {Route, Switch} from "react-router-dom";
import ExamScreen from "../exam";

export default function RouteExam() {
  return (
    <Switch>
      <Route path="/exam/:id" exact>
        <ExamScreen/>
      </Route>
    </Switch>
  );
}