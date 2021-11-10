import React from "react";
import {Switch, Route} from "react-router-dom";
import TableTgRoleList from '../table_list';
import FormTgRoleAdd from '../form_add';
import FormTgRoleEdit from '../form_edit';
import ViewTgRoleInfo from '../view_info';
import TableTgUserRoleList from '../../tg_user_role/table_list';
import FormTgUserRoleAdd from '../../tg_user_role/form_add';
import FormTgUserRoleEdit from '../../tg_user_role/form_edit';
import TableTgRolePermissionList from '../../tg_role_permission/table_list';
import FormTgRolePermissionAdd from '../../tg_role_permission/form_add';
import FormTgRolePermissionEdit from '../../tg_role_permission/form_edit';

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
      <Route
        path="/tgRole/:id/members"
        exact
        render={(renderProps) => (
          <TableTgUserRoleList
            where={{roleId: renderProps.match.params.id}}
            excludeColumns={["roleId"]}
          />
        )}
      />
      <Route
        path="/tgRole/:id/members/add"
        exact
        render={(renderProps) => (
          <FormTgUserRoleAdd
            fixedParams={{roleId: renderProps.match.params.id}}
          />
        )}
      />
      <Route
        path="/tgRole/:id/members/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormTgUserRoleEdit
            fixedParams={{roleId: renderProps.match.params.id}}
          />
        )}
      />
      <Route
        path="/tgRole/:id/permission"
        exact
        render={(renderProps) => (
          <TableTgRolePermissionList
            where={{roleId: renderProps.match.params.id}}
            excludeColumns={["roleId"]}
          />
        )}
      />
      <Route
        path="/tgRole/:id/permission/add"
        exact
        render={(renderProps) => (
          <FormTgRolePermissionAdd
            fixedParams={{roleId: renderProps.match.params.id}}
          />
        )}
      />
      <Route
        path="/tgRole/:id/permission/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormTgRolePermissionEdit
            fixedParams={{roleId: renderProps.match.params.id}}
          />
        )}
      />
    </Switch>
  );
}