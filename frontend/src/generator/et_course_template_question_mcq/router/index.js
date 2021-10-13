import React from "react";
import {Switch, Route} from "react-router-dom";
import TableEtCourseTemplateQuestionMcqList from '../table_list';
import FormEtCourseTemplateQuestionMcqAdd from '../form_add';
import FormEtCourseTemplateQuestionMcqEdit from '../form_edit';
import ViewEtCourseTemplateQuestionMcqInfo from '../view_info';
import TableEtCourseTemplateQuestionTagLinkList from '../../et_course_template_question_tag_link/table_list';
import FormEtCourseTemplateQuestionTagLinkAdd from '../../et_course_template_question_tag_link/form_add';
import FormEtCourseTemplateQuestionTagLinkEdit from '../../et_course_template_question_tag_link/form_edit';

export default function RouteEtCourseTemplateQuestionMcq() {
  return (
    <Switch>
      <Route path="/etCourseTemplateQuestionMCQ" exact>
        <TableEtCourseTemplateQuestionMcqList />
      </Route>
      <Route path="/etCourseTemplateQuestionMCQ/add" exact>
        <FormEtCourseTemplateQuestionMcqAdd />
      </Route>
      <Route path="/etCourseTemplateQuestionMCQ/:id" exact>
        <ViewEtCourseTemplateQuestionMcqInfo />
      </Route>
      <Route path="/etCourseTemplateQuestionMCQ/:selectedObjectId/edit" exact>
        <FormEtCourseTemplateQuestionMcqEdit />
      </Route>
      <Route
        path="/etCourseTemplateQuestionMCQ/:id/tags"
        exact
        render={(renderProps) => (
          <TableEtCourseTemplateQuestionTagLinkList
            where={{questionId: renderProps.match.params.id}}
            excludeColumns={["questionId"]}
          />
        )}
      />
      <Route
        path="/etCourseTemplateQuestionMCQ/:id/tags/add"
        exact
        render={(renderProps) => (
          <FormEtCourseTemplateQuestionTagLinkAdd
            fixedParams={{questionId: renderProps.match.params.id}}
          />
        )}
      />
      <Route
        path="/etCourseTemplateQuestionMCQ/:id/tags/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormEtCourseTemplateQuestionTagLinkEdit
            fixedParams={{questionId: renderProps.match.params.id}}
          />
        )}
      />
    </Switch>
  );
}