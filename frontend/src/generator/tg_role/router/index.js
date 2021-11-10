import React from "react";
import {Switch, Route} from "react-router-dom";
import TableTgRoleList from '../table_list';
import FormTgRoleAdd from '../form_add';
import FormTgRoleEdit from '../form_edit';
import ViewTgRoleInfo from '../view_info';

export default function RouteTgRole() {
  return (
    <Switch>
      <Route path="/tgRole" exact>
        <TableTgRoleList />
      </Route>
      <Route path="/tgRole/add" exact>
        <FormTgRoleAdd />
      </Route>
      <Route path="/tgRole/:id" exact>
        <ViewTgRoleInfo />
      </Route>
      <Route path="/tgRole/:selectedObjectId/edit" exact>
        <FormTgRoleEdit />
      </Route>
    </Switch>
  );
}