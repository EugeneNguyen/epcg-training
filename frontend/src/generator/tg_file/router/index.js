import React from "react";
import {Switch, Route} from "react-router-dom";
import API from '../apis';
import TableTgFileList from '../table_list';
import FormTgFileAdd from '../form_add';
import FormTgFileEdit from '../form_edit';
import ViewTgFileInfo from '../view_info';

export default function RouteTgFile() {
  return (
    <Switch>
      <Route path="/tgFile" exact>
        <TableTgFileList />
      </Route>
      <Route path="/tgFile/add" exact>
        <FormTgFileAdd />
      </Route>
      <Route path="/tgFile/:id" exact>
        <ViewTgFileInfo />
      </Route>
      <Route path="/tgFile/:selectedObjectId/edit" exact>
        <FormTgFileEdit />
      </Route>
    </Switch>
  );
}