import React from "react";
import {Switch, Route} from "react-router-dom";
import TableTgUserTokenList from '../table_list';
import FormTgUserTokenAdd from '../form_add';
import FormTgUserTokenEdit from '../form_edit';
import ViewTgUserTokenInfo from '../view_info';
import API from '../apis';

export default function RouteTgUserToken() {
  return (
    <Switch>
      <Route path="/tgUserToken" exact>
        <TableTgUserTokenList />
      </Route>
      <Route path="/tgUserToken/add" exact>
        <FormTgUserTokenAdd />
      </Route>
      <Route path="/tgUserToken/:id" exact>
        <ViewTgUserTokenInfo />
      </Route>
      <Route path="/tgUserToken/:selectedObjectId/edit" exact>
        <FormTgUserTokenEdit />
      </Route>
    </Switch>
  );
}