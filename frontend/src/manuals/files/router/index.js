import React from "react";
import {Route, Switch} from "react-router-dom";
import FormFileUpload from '../form_add';

export default function RouteFile() {
  return (
    <Switch>
      <Route path="/upload" exact>
        <FormFileUpload/>
      </Route>
    </Switch>
  );
}