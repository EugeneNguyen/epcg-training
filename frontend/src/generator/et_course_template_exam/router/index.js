import React from "react";
import {Switch, Route} from "react-router-dom";
import TableEtCourseTemplateExamList from '../table_list';
import FormEtCourseTemplateExamAdd from '../form_add';
import FormEtCourseTemplateExamEdit from '../form_edit';
import ViewEtCourseTemplateExamInfo from '../view_info';
import TableEtCourseTemplateExamQuestionList from '../../et_course_template_exam_question/table_list';
import FormEtCourseTemplateExamQuestionAdd from '../../et_course_template_exam_question/form_add';
import FormEtCourseTemplateExamQuestionEdit from '../../et_course_template_exam_question/form_edit';
import TableEtExamAttemptList from '../../et_exam_attempt/table_list';
import FormEtExamAttemptAdd from '../../et_exam_attempt/form_add';
import FormEtExamAttemptEdit from '../../et_exam_attempt/form_edit';

export default function RouteEtCourseTemplateExam() {
  return (
    <Switch>
      <Route path="/etCourseTemplateExam" exact>
        <TableEtCourseTemplateExamList />
      </Route>
      <Route path="/etCourseTemplateExam/add" exact>
        <FormEtCourseTemplateExamAdd />
      </Route>
      <Route path="/etCourseTemplateExam/:id" exact>
        <ViewEtCourseTemplateExamInfo />
      </Route>
      <Route path="/etCourseTemplateExam/:selectedObjectId/edit" exact>
        <FormEtCourseTemplateExamEdit />
      </Route>
      <Route
        path="/etCourseTemplateExam/:id/questions"
        exact
        render={(renderProps) => (
          <TableEtCourseTemplateExamQuestionList
            where={{examId: renderProps.match.params.id}}
            excludeColumns={["examId"]}
          />
        )}
      />
      <Route
        path="/etCourseTemplateExam/:id/questions/add"
        exact
        render={(renderProps) => (
          <FormEtCourseTemplateExamQuestionAdd
            fixedParams={{examId: renderProps.match.params.id}}
          />
        )}
      />
      <Route
        path="/etCourseTemplateExam/:id/questions/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormEtCourseTemplateExamQuestionEdit
            fixedParams={{examId: renderProps.match.params.id}}
          />
        )}
      />
      <Route
        path="/etCourseTemplateExam/:id/attempts"
        exact
        render={(renderProps) => (
          <TableEtExamAttemptList
            where={{templateExamId: renderProps.match.params.id}}
            excludeColumns={["templateExamId"]}
          />
        )}
      />
      <Route
        path="/etCourseTemplateExam/:id/attempts/add"
        exact
        render={(renderProps) => (
          <FormEtExamAttemptAdd
            fixedParams={{templateExamId: renderProps.match.params.id}}
          />
        )}
      />
      <Route
        path="/etCourseTemplateExam/:id/attempts/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormEtExamAttemptEdit
            fixedParams={{templateExamId: renderProps.match.params.id}}
          />
        )}
      />
    </Switch>
  );
}