import {useParams} from "react-router-dom";
import ViewTgPermissionGeneral from './general';
import Nav from '../../_components/nav';
import TableTgRolePermissionList from '../../tg_role_permission/table_list';

export default function ViewTgPermissionInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewTgPermissionGeneral objectId={objectId} />},
        {id: 'roles', label: 'Roles', content: (
          <div className="mt-3">
            <TableTgRolePermissionList
              relationshipName="roles"
              where={{permissionId: objectId}}
              excludeColumns={["permissionId"]}
            />
          </div>
        )},
      ]}
    />
  );
}
