import {useParams} from "react-router-dom";
import ViewTgUserTokenGeneral from './general';
import Nav from '../../_components/nav';

export default function ViewTgUserTokenInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewTgUserTokenGeneral objectId={objectId} />},
      ]}
    />
  );
}
