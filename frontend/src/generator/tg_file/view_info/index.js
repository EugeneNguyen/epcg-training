import {useParams} from "react-router-dom";
import ViewTgFileGeneral from './general';
import Nav from '../../_components/nav';

export default function ViewTgFileInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewTgFileGeneral objectId={objectId} />},
      ]}
    />
  );
}
