import {useParams} from "react-router-dom";
import ViewEtCourseTemplateExamQuestionGeneral from './general';
import Nav from '../../_components/nav';

export default function ViewEtCourseTemplateExamQuestionInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewEtCourseTemplateExamQuestionGeneral objectId={objectId} />},
      ]}
    />
  );
}
