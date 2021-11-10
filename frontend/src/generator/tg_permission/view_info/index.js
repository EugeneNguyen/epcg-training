import {useParams} from "react-router-dom";
import ViewTgPermissionGeneral from './general';
import Nav from '../../_components/nav';

export default function ViewTgPermissionInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewTgPermissionGeneral objectId={objectId} />},
      ]}
    />
  );
}
