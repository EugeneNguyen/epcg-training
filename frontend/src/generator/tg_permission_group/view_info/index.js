import {useParams} from "react-router-dom";
import ViewTgPermissionGroupGeneral from './general';
import Nav from '../../_components/nav';

export default function ViewTgPermissionGroupInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewTgPermissionGroupGeneral objectId={objectId} />},
      ]}
    />
  );
}
