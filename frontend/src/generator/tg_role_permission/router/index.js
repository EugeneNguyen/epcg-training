import React from "react";
import {Switch, Route} from "react-router-dom";
import API from '../apis';
import TableTgRolePermissionList from '../table_list';
import FormTgRolePermissionAdd from '../form_add';
import FormTgRolePermissionEdit from '../form_edit';
import ViewTgRolePermissionInfo from '../view_info';

export default function RouteTgRolePermission() {
  return (
    <Switch>
      <Route path="/tgRolePermission" exact>
        <TableTgRolePermissionList />
      </Route>
      <Route path="/tgRolePermission/add" exact>
        <FormTgRolePermissionAdd />
      </Route>
      <Route path="/tgRolePermission/:id" exact>
        <ViewTgRolePermissionInfo />
      </Route>
      <Route path="/tgRolePermission/:selectedObjectId/edit" exact>
        <FormTgRolePermissionEdit />
      </Route>
    </Switch>
  );
}