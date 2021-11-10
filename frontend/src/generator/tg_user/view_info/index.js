import {useParams} from "react-router-dom";
import ViewTgUserGeneral from './general';
import Nav from '../../_components/nav';

export default function ViewTgUserInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewTgUserGeneral objectId={objectId} />},
      ]}
    />
  );
}
