import React from "react";
import {Switch, Route} from "react-router-dom";
import TableEtCourseList from '../table_list';
import FormEtCourseAdd from '../form_add';
import FormEtCourseEdit from '../form_edit';
import ViewEtCourseInfo from '../view_info';

export default function RouteEtCourse() {
  return (
    <Switch>
      <Route path="/etCourse" exact>
        <TableEtCourseList />
      </Route>
      <Route path="/etCourse/add" exact>
        <FormEtCourseAdd />
      </Route>
      <Route path="/etCourse/:id" exact>
        <ViewEtCourseInfo />
      </Route>
      <Route path="/etCourse/:selectedObjectId/edit" exact>
        <FormEtCourseEdit />
      </Route>
    </Switch>
  );
}