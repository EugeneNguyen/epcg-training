import {useParams} from "react-router-dom";
import ViewEtCourseGeneral from './general';
import Nav from '../../_components/nav';

export default function ViewEtCourseInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewEtCourseGeneral objectId={objectId} />},
      ]}
    />
  );
}
