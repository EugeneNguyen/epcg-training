import React from "react";
import {Switch, Route} from "react-router-dom";
import ScreenExamAttemptInfo from "../info";
import ScreenExamAttemptTake from "../take";

export default function RouteExamAttempt() {
  return (
    <Switch>
      <Route path="/exam/attempt/:id" exact>
        <ScreenExamAttemptInfo />
      </Route>
      <Route path="/exam/attempt/:id/take" exact>
        <ScreenExamAttemptTake />
      </Route>
    </Switch>
  );
}