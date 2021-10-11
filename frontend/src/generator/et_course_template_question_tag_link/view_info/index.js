import {useParams} from "react-router-dom";
import ViewEtCourseTemplateQuestionTagLinkGeneral from './general';
import Nav from '../../_components/nav';

export default function ViewEtCourseTemplateQuestionTagLinkInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewEtCourseTemplateQuestionTagLinkGeneral objectId={objectId} />},
      ]}
    />
  );
}
