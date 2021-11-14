import {useParams} from "react-router-dom";
import ViewTgUserGeneral from './general';
import Nav from '../../_components/nav';
import TableTgUserTokenList from '../../tg_user_token/table_list';
import TableTgUserPermissionList from '../../tg_user_permission/table_list';
import TableTgUserRoleList from '../../tg_user_role/table_list';
import TableEtCourseEnrollList from '../../et_course_enroll/table_list';

export default function ViewTgUserInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewTgUserGeneral objectId={objectId} />},
        {id: 'tokens', label: 'Tokens', content: (
          <div className="mt-3">
            <TableTgUserTokenList
              relationshipName="tokens"
              where={{userId: objectId}}
              excludeColumns={["userId"]}
            />
          </div>
        )},
        {id: 'permissions', label: 'Permissions', content: (
          <div className="mt-3">
            <TableTgUserPermissionList
              relationshipName="permissions"
              where={{userId: objectId}}
              excludeColumns={["userId"]}
            />
          </div>
        )},
        {id: 'roles', label: 'Roles', content: (
          <div className="mt-3">
            <TableTgUserRoleList
              relationshipName="roles"
              where={{userId: objectId}}
              excludeColumns={["userId"]}
            />
          </div>
        )},
        {id: 'courses', label: 'Courses', content: (
          <div className="mt-3">
            <TableEtCourseEnrollList
              relationshipName="courses"
              where={{userId: objectId}}
              excludeColumns={["userId"]}
            />
          </div>
        )},
      ]}
    />
  );
}
