import React from "react";
import {Switch, Route} from "react-router-dom";
import TableEtCourseEnrollList from '../table_list';
import FormEtCourseEnrollAdd from '../form_add';
import FormEtCourseEnrollEdit from '../form_edit';
import ViewEtCourseEnrollInfo from '../view_info';
import API from '../apis';

export default function RouteEtCourseEnroll() {
  return (
    <Switch>
      <Route path="/etCourseEnroll" exact>
        <TableEtCourseEnrollList />
      </Route>
      <Route path="/etCourseEnroll/add" exact>
        <FormEtCourseEnrollAdd />
      </Route>
      <Route path="/etCourseEnroll/:id" exact>
        <ViewEtCourseEnrollInfo />
      </Route>
      <Route path="/etCourseEnroll/:selectedObjectId/edit" exact>
        <FormEtCourseEnrollEdit />
      </Route>
    </Switch>
  );
}