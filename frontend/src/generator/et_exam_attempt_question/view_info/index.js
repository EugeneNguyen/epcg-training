import {useParams} from "react-router-dom";
import ViewEtExamAttemptQuestionGeneral from './general';
import Nav from '../../_components/nav';

export default function ViewEtExamAttemptQuestionInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewEtExamAttemptQuestionGeneral objectId={objectId} />},
      ]}
    />
  );
}
