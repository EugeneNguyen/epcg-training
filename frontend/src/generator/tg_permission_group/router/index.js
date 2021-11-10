import React from "react";
import {Switch, Route} from "react-router-dom";
import TableTgPermissionGroupList from '../table_list';
import FormTgPermissionGroupAdd from '../form_add';
import FormTgPermissionGroupEdit from '../form_edit';
import ViewTgPermissionGroupInfo from '../view_info';

export default function RouteTgPermissionGroup() {
  return (
    <Switch>
      <Route path="/tgPermissionGroup" exact>
        <TableTgPermissionGroupList />
      </Route>
      <Route path="/tgPermissionGroup/add" exact>
        <FormTgPermissionGroupAdd />
      </Route>
      <Route path="/tgPermissionGroup/:id" exact>
        <ViewTgPermissionGroupInfo />
      </Route>
      <Route path="/tgPermissionGroup/:selectedObjectId/edit" exact>
        <FormTgPermissionGroupEdit />
      </Route>
    </Switch>
  );
}