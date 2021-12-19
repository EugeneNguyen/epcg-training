import React from "react";
import {Switch, Route} from "react-router-dom";
import API from '../apis';
import TableTgPermissionList from '../table_list';
import FormTgPermissionAdd from '../form_add';
import FormTgPermissionEdit from '../form_edit';
import ViewTgPermissionInfo from '../view_info';
import TableTgRolePermissionList from '../../tg_role_permission/table_list';
import FormTgRolePermissionAdd from '../../tg_role_permission/form_add';
import FormTgRolePermissionEdit from '../../tg_role_permission/form_edit';

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
      <Route
        path="/tgPermission/:id/roles"
        exact
        render={(renderProps) => (
          <TableTgRolePermissionList
            where={{permissionId: renderProps.match.params.id}}
            excludeColumns={["permissionId"]}
          />
        )}
      />
      <Route
        path="/tgPermission/:id/roles/add"
        exact
        render={(renderProps) => (
          <FormTgRolePermissionAdd
            fixedParams={{permissionId: renderProps.match.params.id}}
            parent={{
              query: API.GET_BY_ID,
              variables: { id: renderProps.match.params.id},
            }}
          />
        )}
      />
      <Route
        path="/tgPermission/:id/roles/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormTgRolePermissionEdit
            fixedParams={{permissionId: renderProps.match.params.id}}
            parent={{
              query: API.GET_BY_ID,
              variables: { id: renderProps.match.params.id},
            }}
          />
        )}
      />
    </Switch>
  );
}