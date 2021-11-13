import {useParams} from "react-router-dom";
import ViewEtCourseEnrollGeneral from './general';
import Nav from '../../_components/nav';

export default function ViewEtCourseEnrollInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewEtCourseEnrollGeneral objectId={objectId} />},
      ]}
    />
  );
}
