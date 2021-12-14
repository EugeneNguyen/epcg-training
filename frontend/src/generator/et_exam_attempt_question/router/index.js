import React from "react";
import {Switch, Route} from "react-router-dom";
import API from '../apis';
import TableEtExamAttemptQuestionList from '../table_list';
import FormEtExamAttemptQuestionAdd from '../form_add';
import FormEtExamAttemptQuestionEdit from '../form_edit';
import ViewEtExamAttemptQuestionInfo from '../view_info';

export default function RouteEtExamAttemptQuestion() {
  return (
    <Switch>
      <Route path="/etExamAttemptQuestion" exact>
        <TableEtExamAttemptQuestionList />
      </Route>
      <Route path="/etExamAttemptQuestion/add" exact>
        <FormEtExamAttemptQuestionAdd />
      </Route>
      <Route path="/etExamAttemptQuestion/:id" exact>
        <ViewEtExamAttemptQuestionInfo />
      </Route>
      <Route path="/etExamAttemptQuestion/:selectedObjectId/edit" exact>
        <FormEtExamAttemptQuestionEdit />
      </Route>
    </Switch>
  );
}