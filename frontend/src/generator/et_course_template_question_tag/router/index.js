import React from "react";
import {Switch, Route} from "react-router-dom";
import TableEtCourseTemplateQuestionTagList from '../table_list';
import FormEtCourseTemplateQuestionTagAdd from '../form_add';
import FormEtCourseTemplateQuestionTagEdit from '../form_edit';
import ViewEtCourseTemplateQuestionTagInfo from '../view_info';
import TableEtCourseTemplateQuestionTagLinkList from '../../et_course_template_question_tag_link/table_list';
import FormEtCourseTemplateQuestionTagLinkAdd from '../../et_course_template_question_tag_link/form_add';
import FormEtCourseTemplateQuestionTagLinkEdit from '../../et_course_template_question_tag_link/form_edit';

export default function RouteEtCourseTemplateQuestionTag() {
  return (
    <Switch>
      <Route path="/etCourseTemplateQuestionTag" exact>
        <TableEtCourseTemplateQuestionTagList />
      </Route>
      <Route path="/etCourseTemplateQuestionTag/add" exact>
        <FormEtCourseTemplateQuestionTagAdd />
      </Route>
      <Route path="/etCourseTemplateQuestionTag/:id" exact>
        <ViewEtCourseTemplateQuestionTagInfo />
      </Route>
      <Route path="/etCourseTemplateQuestionTag/:id/edit" exact>
        <FormEtCourseTemplateQuestionTagEdit />
      </Route>
      <Route
        path="/etCourseTemplateQuestionTag/:id/questions"
        exact
        render={(renderProps) => (
          <TableEtCourseTemplateQuestionTagLinkList
            where={{questionTagId: renderProps.match.params.id}}
            excludeColumns={["questionTagId"]}
          />
        )}
      />
      <Route
        path="/etCourseTemplateQuestionTag/:id/questions/add"
        exact
        render={(renderProps) => (
          <FormEtCourseTemplateQuestionTagLinkAdd
            fixedParams={{questionTagId: renderProps.match.params.id}}
          />
        )}
      />
      <Route
        path="/etCourseTemplateQuestionTag/:id/questions/:id/edit"
        exact
        render={(renderProps) => (
          <FormEtCourseTemplateQuestionTagLinkEdit
            fixedParams={{questionTagId: renderProps.match.params.id}}
          />
        )}
      />
    </Switch>
  );
}