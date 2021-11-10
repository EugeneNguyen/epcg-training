import {useParams} from "react-router-dom";
import ViewTgRolePermissionGeneral from './general';
import Nav from '../../_components/nav';

export default function ViewTgRolePermissionInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewTgRolePermissionGeneral objectId={objectId} />},
      ]}
    />
  );
}
