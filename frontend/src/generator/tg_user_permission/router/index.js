import React from "react";
import {Switch, Route} from "react-router-dom";
import API from '../apis';
import TableTgUserPermissionList from '../table_list';
import FormTgUserPermissionAdd from '../form_add';
import FormTgUserPermissionEdit from '../form_edit';
import ViewTgUserPermissionInfo from '../view_info';

export default function RouteTgUserPermission() {
  return (
    <Switch>
      <Route path="/tgUserPermission" exact>
        <TableTgUserPermissionList />
      </Route>
      <Route path="/tgUserPermission/add" exact>
        <FormTgUserPermissionAdd />
      </Route>
      <Route path="/tgUserPermission/:id" exact>
        <ViewTgUserPermissionInfo />
      </Route>
      <Route path="/tgUserPermission/:selectedObjectId/edit" exact>
        <FormTgUserPermissionEdit />
      </Route>
    </Switch>
  );
}