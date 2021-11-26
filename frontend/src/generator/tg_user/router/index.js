import React from "react";
import {Switch, Route} from "react-router-dom";
import API from '../apis';
import TableTgUserList from '../table_list';
import FormTgUserAdd from '../form_add';
import FormTgUserEdit from '../form_edit';
import ViewTgUserInfo from '../view_info';
import TableTgUserTokenList from '../../tg_user_token/table_list';
import FormTgUserTokenAdd from '../../tg_user_token/form_add';
import FormTgUserTokenEdit from '../../tg_user_token/form_edit';
import TableTgUserPermissionList from '../../tg_user_permission/table_list';
import FormTgUserPermissionAdd from '../../tg_user_permission/form_add';
import FormTgUserPermissionEdit from '../../tg_user_permission/form_edit';
import TableTgUserRoleList from '../../tg_user_role/table_list';
import FormTgUserRoleAdd from '../../tg_user_role/form_add';
import FormTgUserRoleEdit from '../../tg_user_role/form_edit';
import TableEtCourseEnrollList from '../../et_course_enroll/table_list';
import FormEtCourseEnrollAdd from '../../et_course_enroll/form_add';
import FormEtCourseEnrollEdit from '../../et_course_enroll/form_edit';
import TableEtExamAttemptList from '../../et_exam_attempt/table_list';
import FormEtExamAttemptAdd from '../../et_exam_attempt/form_add';
import FormEtExamAttemptEdit from '../../et_exam_attempt/form_edit';

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
      <Route
        path="/tgUser/:id/tokens"
        exact
        render={(renderProps) => (
          <TableTgUserTokenList
            where={{userId: renderProps.match.params.id}}
            excludeColumns={["userId"]}
          />
        )}
      />
      <Route
        path="/tgUser/:id/tokens/add"
        exact
        render={(renderProps) => (
          <FormTgUserTokenAdd
            fixedParams={{userId: renderProps.match.params.id}}
            parent={{
              query: API.GET_BY_ID,
              variables: { id: renderProps.match.params.id},
            }}
          />
        )}
      />
      <Route
        path="/tgUser/:id/tokens/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormTgUserTokenEdit
            fixedParams={{userId: renderProps.match.params.id}}
            parent={{
              query: API.GET_BY_ID,
              variables: { id: renderProps.match.params.id},
            }}
          />
        )}
      />
      <Route
        path="/tgUser/:id/permissions"
        exact
        render={(renderProps) => (
          <TableTgUserPermissionList
            where={{userId: renderProps.match.params.id}}
            excludeColumns={["userId"]}
          />
        )}
      />
      <Route
        path="/tgUser/:id/permissions/add"
        exact
        render={(renderProps) => (
          <FormTgUserPermissionAdd
            fixedParams={{userId: renderProps.match.params.id}}
            parent={{
              query: API.GET_BY_ID,
              variables: { id: renderProps.match.params.id},
            }}
          />
        )}
      />
      <Route
        path="/tgUser/:id/permissions/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormTgUserPermissionEdit
            fixedParams={{userId: renderProps.match.params.id}}
            parent={{
              query: API.GET_BY_ID,
              variables: { id: renderProps.match.params.id},
            }}
          />
        )}
      />
      <Route
        path="/tgUser/:id/roles"
        exact
        render={(renderProps) => (
          <TableTgUserRoleList
            where={{userId: renderProps.match.params.id}}
            excludeColumns={["userId"]}
          />
        )}
      />
      <Route
        path="/tgUser/:id/roles/add"
        exact
        render={(renderProps) => (
          <FormTgUserRoleAdd
            fixedParams={{userId: renderProps.match.params.id}}
            parent={{
              query: API.GET_BY_ID,
              variables: { id: renderProps.match.params.id},
            }}
          />
        )}
      />
      <Route
        path="/tgUser/:id/roles/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormTgUserRoleEdit
            fixedParams={{userId: renderProps.match.params.id}}
            parent={{
              query: API.GET_BY_ID,
              variables: { id: renderProps.match.params.id},
            }}
          />
        )}
      />
      <Route
        path="/tgUser/:id/courses"
        exact
        render={(renderProps) => (
          <TableEtCourseEnrollList
            where={{userId: renderProps.match.params.id}}
            excludeColumns={["userId"]}
          />
        )}
      />
      <Route
        path="/tgUser/:id/courses/add"
        exact
        render={(renderProps) => (
          <FormEtCourseEnrollAdd
            fixedParams={{userId: renderProps.match.params.id}}
            parent={{
              query: API.GET_BY_ID,
              variables: { id: renderProps.match.params.id},
            }}
          />
        )}
      />
      <Route
        path="/tgUser/:id/courses/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormEtCourseEnrollEdit
            fixedParams={{userId: renderProps.match.params.id}}
            parent={{
              query: API.GET_BY_ID,
              variables: { id: renderProps.match.params.id},
            }}
          />
        )}
      />
      <Route
        path="/tgUser/:id/examAttempts"
        exact
        render={(renderProps) => (
          <TableEtExamAttemptList
            where={{userId: renderProps.match.params.id}}
            excludeColumns={["userId"]}
          />
        )}
      />
      <Route
        path="/tgUser/:id/examAttempts/add"
        exact
        render={(renderProps) => (
          <FormEtExamAttemptAdd
            fixedParams={{userId: renderProps.match.params.id}}
            parent={{
              query: API.GET_BY_ID,
              variables: { id: renderProps.match.params.id},
            }}
          />
        )}
      />
      <Route
        path="/tgUser/:id/examAttempts/:selectedObjectId/edit"
        exact
        render={(renderProps) => (
          <FormEtExamAttemptEdit
            fixedParams={{userId: renderProps.match.params.id}}
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