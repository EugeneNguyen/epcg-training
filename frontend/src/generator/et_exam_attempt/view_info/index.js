import {useParams} from "react-router-dom";
import ViewEtExamAttemptGeneral from './general';
import Nav from '../../_components/nav';
import TableEtExamAttemptQuestionList from '../../et_exam_attempt_question/table_list';

export default function ViewEtExamAttemptInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewEtExamAttemptGeneral objectId={objectId} />},
        {id: 'questions', label: 'Questions', content: (
          <div className="mt-3">
            <TableEtExamAttemptQuestionList
              relationshipName="questions"
              where={{attemptId: objectId}}
              excludeColumns={["attemptId"]}
            />
          </div>
        )},
      ]}
    />
  );
}
