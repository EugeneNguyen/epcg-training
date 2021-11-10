import {useParams} from "react-router-dom";
import ViewTgPermissionGroupGeneral from './general';
import Nav from '../../_components/nav';
import TableTgPermissionList from '../../tg_permission/table_list';

export default function ViewTgPermissionGroupInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewTgPermissionGroupGeneral objectId={objectId} />},
        {id: 'permissions', label: 'Permissions', content: (
          <div className="mt-3">
            <TableTgPermissionList
              relationshipName="permissions"
              where={{groupId: objectId}}
              excludeColumns={["groupId"]}
            />
          </div>
        )},
      ]}
    />
  );
}
