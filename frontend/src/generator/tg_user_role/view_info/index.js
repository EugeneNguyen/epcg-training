import {useParams} from "react-router-dom";
import ViewTgUserRoleGeneral from './general';
import Nav from '../../_components/nav';

export default function ViewTgUserRoleInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewTgUserRoleGeneral objectId={objectId} />},
      ]}
    />
  );
}
