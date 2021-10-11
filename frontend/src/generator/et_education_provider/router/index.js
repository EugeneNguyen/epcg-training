import React from "react";
import {Switch, Route} from "react-router-dom";
import TableEtEducationProviderList from '../table_list';
import FormEtEducationProviderAdd from '../form_add';
import FormEtEducationProviderEdit from '../form_edit';
import ViewEtEducationProviderInfo from '../view_info';
import TableEtCourseTemplateList from '../../et_course_template/table_list';
import FormEtCourseTemplateAdd from '../../et_course_template/form_add';
import FormEtCourseTemplateEdit from '../../et_course_template/form_edit';

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
      <Route
        path="/etEducationProvider/:id/courseTemplates"
        exact
        render={(renderProps) => (
          <TableEtCourseTemplateList
            where={{educationProviderId: renderProps.match.params.id}}
            excludeColumns={["educationProviderId"]}
          />
        )}
      />
      <Route
        path="/etEducationProvider/:id/courseTemplates/add"
        exact
        render={(renderProps) => (
          <FormEtCourseTemplateAdd
            fixedParams={{educationProviderId: renderProps.match.params.id}}
          />
        )}
      />
      <Route
        path="/etEducationProvider/:id/courseTemplates/:id/edit"
        exact
        render={(renderProps) => (
          <FormEtCourseTemplateEdit
            fixedParams={{educationProviderId: renderProps.match.params.id}}
          />
          )}
      />
    </Switch>
  );
}