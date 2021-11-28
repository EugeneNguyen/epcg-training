import React from "react";
import {Switch, Route} from "react-router-dom";
import API from '../apis';
import TableEtCourseExamList from '../table_list';
import FormEtCourseExamAdd from '../form_add';
import FormEtCourseExamEdit from '../form_edit';
import ViewEtCourseExamInfo from '../view_info';
import TableEtExamAttemptList from '../../et_exam_attempt/table_list';
import FormEtExamAttemptAdd from '../../et_exam_attempt/form_add';
import FormEtExamAttemptEdit from '../../et_exam_attempt/form_edit';

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
      <Route
        path="/etCourseExam/:id/attempts"
        exact
        render={(renderProps) => (
          <TableEtExamAttemptList
            where={{examId: renderProps.match.params.id}}
            excludeColumns={["examId"]}
          />
        )}
      />
      <Route
        path="/etCourseExam/:id/attempts/add"
        exact
        render={(renderProps) => (
          <FormEtExamAttemptAdd
            fixedParams={{examId: renderProps.match.params.id}}
            parent={{
              query: API.GET_BY_ID,
              variables: { id: renderProps.match.params.id},
            }}
          />
        )}
      />
      <Route
        path="/etCourseExam/:id/attempts/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormEtExamAttemptEdit
            fixedParams={{examId: renderProps.match.params.id}}
            parent={{
              query: API.GET_BY_ID,
              variables: { id: renderProps.match.params.id},
            }}
          />
        )}
      />
    </Switch>
  );
}