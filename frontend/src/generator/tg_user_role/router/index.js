import React from "react";
import {Switch, Route} from "react-router-dom";
import TableTgUserRoleList from '../table_list';
import FormTgUserRoleAdd from '../form_add';
import FormTgUserRoleEdit from '../form_edit';
import ViewTgUserRoleInfo from '../view_info';
import API from '../apis';

export default function RouteTgUserRole() {
  return (
    <Switch>
      <Route path="/tgUserRole" exact>
        <TableTgUserRoleList />
      </Route>
      <Route path="/tgUserRole/add" exact>
        <FormTgUserRoleAdd />
      </Route>
      <Route path="/tgUserRole/:id" exact>
        <ViewTgUserRoleInfo />
      </Route>
      <Route path="/tgUserRole/:selectedObjectId/edit" exact>
        <FormTgUserRoleEdit />
      </Route>
    </Switch>
  );
}