import {useParams} from "react-router-dom";
import ViewTgRoleGeneral from './general';
import Nav from '../../_components/nav';
import TableTgUserRoleList from '../../tg_user_role/table_list';
import TableTgRolePermissionList from '../../tg_role_permission/table_list';

export default function ViewTgRoleInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewTgRoleGeneral objectId={objectId} />},
        {id: 'members', label: 'Members', content: (
          <div className="mt-3">
            <TableTgUserRoleList
              relationshipName="members"
              where={{roleId: objectId}}
              excludeColumns={["roleId"]}
            />
          </div>
        )},
        {id: 'permission', label: 'Permissions', content: (
          <div className="mt-3">
            <TableTgRolePermissionList
              relationshipName="permission"
              where={{roleId: objectId}}
              excludeColumns={["roleId"]}
            />
          </div>
        )},
      ]}
    />
  );
}
