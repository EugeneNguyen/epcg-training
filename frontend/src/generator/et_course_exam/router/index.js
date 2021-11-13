import React from "react";
import {Switch, Route} from "react-router-dom";
import TableEtCourseExamList from '../table_list';
import FormEtCourseExamAdd from '../form_add';
import FormEtCourseExamEdit from '../form_edit';
import ViewEtCourseExamInfo from '../view_info';

export default function RouteEtCourseExam() {
  return (
    <Switch>
      <Route path="/etCourseExam" exact>
        <TableEtCourseExamList />
      </Route>
      <Route path="/etCourseExam/add" exact>
        <FormEtCourseExamAdd />
      </Route>
      <Route path="/etCourseExam/:id" exact>
        <ViewEtCourseExamInfo />
      </Route>
      <Route path="/etCourseExam/:selectedObjectId/edit" exact>
        <FormEtCourseExamEdit />
      </Route>
    </Switch>
  );
}