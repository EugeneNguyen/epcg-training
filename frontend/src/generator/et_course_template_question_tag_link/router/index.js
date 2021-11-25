import React from "react";
import {Switch, Route} from "react-router-dom";
import TableEtCourseTemplateQuestionTagLinkList from '../table_list';
import FormEtCourseTemplateQuestionTagLinkAdd from '../form_add';
import FormEtCourseTemplateQuestionTagLinkEdit from '../form_edit';
import ViewEtCourseTemplateQuestionTagLinkInfo from '../view_info';
import API from '../apis';

export default function RouteEtCourseTemplateQuestionTagLink() {
  return (
    <Switch>
      <Route path="/etCourseTemplateQuestionTagLink" exact>
        <TableEtCourseTemplateQuestionTagLinkList />
      </Route>
      <Route path="/etCourseTemplateQuestionTagLink/add" exact>
        <FormEtCourseTemplateQuestionTagLinkAdd />
      </Route>
      <Route path="/etCourseTemplateQuestionTagLink/:id" exact>
        <ViewEtCourseTemplateQuestionTagLinkInfo />
      </Route>
      <Route path="/etCourseTemplateQuestionTagLink/:selectedObjectId/edit" exact>
        <FormEtCourseTemplateQuestionTagLinkEdit />
      </Route>
    </Switch>
  );
}