import React from "react";
import {Switch, Route} from "react-router-dom";
import TableEtCourseTemplateList from '../table_list';
import FormEtCourseTemplateAdd from '../form_add';
import FormEtCourseTemplateEdit from '../form_edit';
import ViewEtCourseTemplateInfo from '../view_info';

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
      <Route path="/etCourseTemplate/:id/edit" exact>
        <FormEtCourseTemplateEdit />
      </Route>
    </Switch>
  );
}