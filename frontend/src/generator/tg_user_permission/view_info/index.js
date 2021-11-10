import {useParams} from "react-router-dom";
import ViewTgUserPermissionGeneral from './general';
import Nav from '../../_components/nav';

export default function ViewTgUserPermissionInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewTgUserPermissionGeneral objectId={objectId} />},
      ]}
    />
  );
}
