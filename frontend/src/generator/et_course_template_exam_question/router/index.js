import React from "react";
import {Switch, Route} from "react-router-dom";
import TableEtCourseTemplateExamQuestionList from '../table_list';
import FormEtCourseTemplateExamQuestionAdd from '../form_add';
import FormEtCourseTemplateExamQuestionEdit from '../form_edit';
import ViewEtCourseTemplateExamQuestionInfo from '../view_info';

export default function RouteEtCourseTemplateExamQuestion() {
  return (
    <Switch>
      <Route path="/etCourseTemplateExamQuestion" exact>
        <TableEtCourseTemplateExamQuestionList />
      </Route>
      <Route path="/etCourseTemplateExamQuestion/add" exact>
        <FormEtCourseTemplateExamQuestionAdd />
      </Route>
      <Route path="/etCourseTemplateExamQuestion/:id" exact>
        <ViewEtCourseTemplateExamQuestionInfo />
      </Route>
      <Route path="/etCourseTemplateExamQuestion/:selectedObjectId/edit" exact>
        <FormEtCourseTemplateExamQuestionEdit />
      </Route>
    </Switch>
  );
}