import React from "react";
import {Switch, Route} from "react-router-dom";
import TableEtCourseList from '../table_list';
import FormEtCourseAdd from '../form_add';
import FormEtCourseEdit from '../form_edit';
import ViewEtCourseInfo from '../view_info';
import TableEtCourseEnrollList from '../../et_course_enroll/table_list';
import FormEtCourseEnrollAdd from '../../et_course_enroll/form_add';
import FormEtCourseEnrollEdit from '../../et_course_enroll/form_edit';

export default function RouteEtCourse() {
  return (
    <Switch>
      <Route path="/etCourse" exact>
        <TableEtCourseList />
      </Route>
      <Route path="/etCourse/add" exact>
        <FormEtCourseAdd />
      </Route>
      <Route path="/etCourse/:id" exact>
        <ViewEtCourseInfo />
      </Route>
      <Route path="/etCourse/:selectedObjectId/edit" exact>
        <FormEtCourseEdit />
      </Route>
      <Route
        path="/etCourse/:id/enrolls"
        exact
        render={(renderProps) => (
          <TableEtCourseEnrollList
            where={{courseId: renderProps.match.params.id}}
            excludeColumns={["courseId"]}
          />
        )}
      />
      <Route
        path="/etCourse/:id/enrolls/add"
        exact
        render={(renderProps) => (
          <FormEtCourseEnrollAdd
            fixedParams={{courseId: renderProps.match.params.id}}
          />
        )}
      />
      <Route
        path="/etCourse/:id/enrolls/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormEtCourseEnrollEdit
            fixedParams={{courseId: renderProps.match.params.id}}
          />
        )}
      />
    </Switch>
  );
}