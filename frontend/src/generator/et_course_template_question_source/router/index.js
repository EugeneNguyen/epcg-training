import React from "react";
import {Switch, Route} from "react-router-dom";
import API from '../apis';
import TableEtCourseTemplateQuestionSourceList from '../table_list';
import FormEtCourseTemplateQuestionSourceAdd from '../form_add';
import FormEtCourseTemplateQuestionSourceEdit from '../form_edit';
import ViewEtCourseTemplateQuestionSourceInfo from '../view_info';
import TableEtCourseTemplateQuestionMcqList from '../../et_course_template_question_mcq/table_list';
import FormEtCourseTemplateQuestionMcqAdd from '../../et_course_template_question_mcq/form_add';
import FormEtCourseTemplateQuestionMcqEdit from '../../et_course_template_question_mcq/form_edit';

export default function RouteEtCourseTemplateQuestionSource() {
  return (
    <Switch>
      <Route path="/etCourseTemplateQuestionSource" exact>
        <TableEtCourseTemplateQuestionSourceList />
      </Route>
      <Route path="/etCourseTemplateQuestionSource/add" exact>
        <FormEtCourseTemplateQuestionSourceAdd />
      </Route>
      <Route path="/etCourseTemplateQuestionSource/:id" exact>
        <ViewEtCourseTemplateQuestionSourceInfo />
      </Route>
      <Route path="/etCourseTemplateQuestionSource/:selectedObjectId/edit" exact>
        <FormEtCourseTemplateQuestionSourceEdit />
      </Route>
      <Route
        path="/etCourseTemplateQuestionSource/:id/questions"
        exact
        render={(renderProps) => (
          <TableEtCourseTemplateQuestionMcqList
            where={{questionSourceId: renderProps.match.params.id}}
            excludeColumns={["questionSourceId"]}
          />
        )}
      />
      <Route
        path="/etCourseTemplateQuestionSource/:id/questions/add"
        exact
        render={(renderProps) => (
          <FormEtCourseTemplateQuestionMcqAdd
            fixedParams={{questionSourceId: renderProps.match.params.id}}
            parent={{
              query: API.GET_BY_ID,
              variables: { id: renderProps.match.params.id},
            }}
          />
        )}
      />
      <Route
        path="/etCourseTemplateQuestionSource/:id/questions/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormEtCourseTemplateQuestionMcqEdit
            fixedParams={{questionSourceId: renderProps.match.params.id}}
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