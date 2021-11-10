import React from "react";
import {Switch, Route} from "react-router-dom";
import TableTgPermissionList from '../table_list';
import FormTgPermissionAdd from '../form_add';
import FormTgPermissionEdit from '../form_edit';
import ViewTgPermissionInfo from '../view_info';

export default function RouteTgPermission() {
  return (
    <Switch>
      <Route path="/tgPermission" exact>
        <TableTgPermissionList />
      </Route>
      <Route path="/tgPermission/add" exact>
        <FormTgPermissionAdd />
      </Route>
      <Route path="/tgPermission/:id" exact>
        <ViewTgPermissionInfo />
      </Route>
      <Route path="/tgPermission/:selectedObjectId/edit" exact>
        <FormTgPermissionEdit />
      </Route>
    </Switch>
  );
}