import React from "react";
import {Switch, Route} from "react-router-dom";
import API from '../apis';
import TableTgPermissionGroupList from '../table_list';
import FormTgPermissionGroupAdd from '../form_add';
import FormTgPermissionGroupEdit from '../form_edit';
import ViewTgPermissionGroupInfo from '../view_info';
import TableTgPermissionList from '../../tg_permission/table_list';
import FormTgPermissionAdd from '../../tg_permission/form_add';
import FormTgPermissionEdit from '../../tg_permission/form_edit';

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
      <Route
        path="/tgPermissionGroup/:id/permissions"
        exact
        render={(renderProps) => (
          <TableTgPermissionList
            where={{groupId: renderProps.match.params.id}}
            excludeColumns={["groupId"]}
          />
        )}
      />
      <Route
        path="/tgPermissionGroup/:id/permissions/add"
        exact
        render={(renderProps) => (
          <FormTgPermissionAdd
            fixedParams={{groupId: renderProps.match.params.id}}
            parent={{
              query: API.GET_BY_ID,
              variables: { id: renderProps.match.params.id},
            }}
          />
        )}
      />
      <Route
        path="/tgPermissionGroup/:id/permissions/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormTgPermissionEdit
            fixedParams={{groupId: renderProps.match.params.id}}
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