import React from "react";
import {Switch, Route} from "react-router-dom";
import TableTgUserList from '../table_list';
import FormTgUserAdd from '../form_add';
import FormTgUserEdit from '../form_edit';
import ViewTgUserInfo from '../view_info';

export default function RouteTgUser() {
  return (
    <Switch>
      <Route path="/tgUser" exact>
        <TableTgUserList />
      </Route>
      <Route path="/tgUser/add" exact>
        <FormTgUserAdd />
      </Route>
      <Route path="/tgUser/:id" exact>
        <ViewTgUserInfo />
      </Route>
      <Route path="/tgUser/:selectedObjectId/edit" exact>
        <FormTgUserEdit />
      </Route>
    </Switch>
  );
}