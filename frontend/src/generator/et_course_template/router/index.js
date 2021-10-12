import React from "react";
import {Switch, Route} from "react-router-dom";
import TableEtCourseTemplateList from '../table_list';
import FormEtCourseTemplateAdd from '../form_add';
import FormEtCourseTemplateEdit from '../form_edit';
import ViewEtCourseTemplateInfo from '../view_info';
import TableEtCourseTemplateQuestionMcqList from '../../et_course_template_question_mcq/table_list';
import FormEtCourseTemplateQuestionMcqAdd from '../../et_course_template_question_mcq/form_add';
import FormEtCourseTemplateQuestionMcqEdit from '../../et_course_template_question_mcq/form_edit';
import TableEtCourseTemplateQuestionSourceList from '../../et_course_template_question_source/table_list';
import FormEtCourseTemplateQuestionSourceAdd from '../../et_course_template_question_source/form_add';
import FormEtCourseTemplateQuestionSourceEdit from '../../et_course_template_question_source/form_edit';
import TableEtCourseTemplateQuestionTagList from '../../et_course_template_question_tag/table_list';
import FormEtCourseTemplateQuestionTagAdd from '../../et_course_template_question_tag/form_add';
import FormEtCourseTemplateQuestionTagEdit from '../../et_course_template_question_tag/form_edit';
import TableEtCourseTemplateExamList from '../../et_course_template_exam/table_list';
import FormEtCourseTemplateExamAdd from '../../et_course_template_exam/form_add';
import FormEtCourseTemplateExamEdit from '../../et_course_template_exam/form_edit';

export default function RouteEtCourseTemplate() {
  return (
    <Switch>
      <Route path="/etCourseTemplate" exact>
        <TableEtCourseTemplateList />
      </Route>
      <Route path="/etCourseTemplate/add" exact>
        <FormEtCourseTemplateAdd />
      </Route>
      <Route path="/etCourseTemplate/:id" exact>
        <ViewEtCourseTemplateInfo />
      </Route>
      <Route path="/etCourseTemplate/:selectedObjectId/edit" exact>
        <FormEtCourseTemplateEdit />
      </Route>
      <Route
        path="/etCourseTemplate/:id/questions"
        exact
        render={(renderProps) => (
          <TableEtCourseTemplateQuestionMcqList
            where={{courseTemplateId: renderProps.match.params.id}}
            excludeColumns={["courseTemplateId"]}
          />
        )}
      />
      <Route
        path="/etCourseTemplate/:id/questions/add"
        exact
        render={(renderProps) => (
          <FormEtCourseTemplateQuestionMcqAdd
            fixedParams={{courseTemplateId: renderProps.match.params.id}}
          />
        )}
      />
      <Route
        path="/etCourseTemplate/:id/questions/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormEtCourseTemplateQuestionMcqEdit
            fixedParams={{courseTemplateId: renderProps.match.params.id}}
          />
        )}
      />
      <Route
        path="/etCourseTemplate/:id/questionSources"
        exact
        render={(renderProps) => (
          <TableEtCourseTemplateQuestionSourceList
            where={{courseTemplateId: renderProps.match.params.id}}
            excludeColumns={["courseTemplateId"]}
          />
        )}
      />
      <Route
        path="/etCourseTemplate/:id/questionSources/add"
        exact
        render={(renderProps) => (
          <FormEtCourseTemplateQuestionSourceAdd
            fixedParams={{courseTemplateId: renderProps.match.params.id}}
          />
        )}
      />
      <Route
        path="/etCourseTemplate/:id/questionSources/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormEtCourseTemplateQuestionSourceEdit
            fixedParams={{courseTemplateId: renderProps.match.params.id}}
          />
        )}
      />
      <Route
        path="/etCourseTemplate/:id/tags"
        exact
        render={(renderProps) => (
          <TableEtCourseTemplateQuestionTagList
            where={{courseTemplateId: renderProps.match.params.id}}
            excludeColumns={["courseTemplateId"]}
          />
        )}
      />
      <Route
        path="/etCourseTemplate/:id/tags/add"
        exact
        render={(renderProps) => (
          <FormEtCourseTemplateQuestionTagAdd
            fixedParams={{courseTemplateId: renderProps.match.params.id}}
          />
        )}
      />
      <Route
        path="/etCourseTemplate/:id/tags/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormEtCourseTemplateQuestionTagEdit
            fixedParams={{courseTemplateId: renderProps.match.params.id}}
          />
        )}
      />
      <Route
        path="/etCourseTemplate/:id/exams"
        exact
        render={(renderProps) => (
          <TableEtCourseTemplateExamList
            where={{courseTemplateId: renderProps.match.params.id}}
            excludeColumns={["courseTemplateId"]}
          />
        )}
      />
      <Route
        path="/etCourseTemplate/:id/exams/add"
        exact
        render={(renderProps) => (
          <FormEtCourseTemplateExamAdd
            fixedParams={{courseTemplateId: renderProps.match.params.id}}
          />
        )}
      />
      <Route
        path="/etCourseTemplate/:id/exams/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormEtCourseTemplateExamEdit
            fixedParams={{courseTemplateId: renderProps.match.params.id}}
          />
        )}
      />
    </Switch>
  );
}