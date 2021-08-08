import React from "react";
import {Switch, Route} from "react-router-dom";
import TableEtEducationProviderList from '../table_list';
import FormEtEducationProviderAdd from '../form_add';
import FormEtEducationProviderEdit from '../form_edit';
import ViewEtEducationProviderInfo from '../view_info';

export default function RouteEtEducationProvider() {
  return (
    <Switch>
      <Route path="/etEducationProvider" exact>
        <TableEtEducationProviderList />
      </Route>
      <Route path="/etEducationProvider/add" exact>
        <FormEtEducationProviderAdd />
      </Route>
      <Route path="/etEducationProvider/:id" exact>
        <ViewEtEducationProviderInfo />
      </Route>
      <Route path="/etEducationProvider/:id/edit" exact>
        <FormEtEducationProviderEdit />
      </Route>
    </Switch>
  );
}