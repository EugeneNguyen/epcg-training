import React from "react";
import {Switch, Route} from "react-router-dom";
import TableEtExamAttemptList from '../table_list';
import FormEtExamAttemptAdd from '../form_add';
import FormEtExamAttemptEdit from '../form_edit';
import ViewEtExamAttemptInfo from '../view_info';
import TableEtExamAttemptQuestionList from '../../et_exam_attempt_question/table_list';
import FormEtExamAttemptQuestionAdd from '../../et_exam_attempt_question/form_add';
import FormEtExamAttemptQuestionEdit from '../../et_exam_attempt_question/form_edit';

export default function RouteEtExamAttempt() {
  return (
    <Switch>
      <Route path="/etExamAttempt" exact>
        <TableEtExamAttemptList />
      </Route>
      <Route path="/etExamAttempt/add" exact>
        <FormEtExamAttemptAdd />
      </Route>
      <Route path="/etExamAttempt/:id" exact>
        <ViewEtExamAttemptInfo />
      </Route>
      <Route path="/etExamAttempt/:selectedObjectId/edit" exact>
        <FormEtExamAttemptEdit />
      </Route>
      <Route
        path="/etExamAttempt/:id/questions"
        exact
        render={(renderProps) => (
          <TableEtExamAttemptQuestionList
            where={{attemptId: renderProps.match.params.id}}
            excludeColumns={["attemptId"]}
          />
        )}
      />
      <Route
        path="/etExamAttempt/:id/questions/add"
        exact
        render={(renderProps) => (
          <FormEtExamAttemptQuestionAdd
            fixedParams={{attemptId: renderProps.match.params.id}}
          />
        )}
      />
      <Route
        path="/etExamAttempt/:id/questions/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormEtExamAttemptQuestionEdit
            fixedParams={{attemptId: renderProps.match.params.id}}
          />
        )}
      />
    </Switch>
  );
}