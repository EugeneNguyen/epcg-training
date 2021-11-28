import {useParams} from "react-router-dom";
import ViewEtCourseExamGeneral from './general';
import Nav from '../../_components/nav';
import TableEtExamAttemptList from '../../et_exam_attempt/table_list';

export default function ViewEtCourseExamInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewEtCourseExamGeneral objectId={objectId} />},
        {id: 'attempts', label: 'Attempts', content: (
          <div className="mt-3">
            <TableEtExamAttemptList
              relationshipName="attempts"
              where={{examId: objectId}}
              excludeColumns={["examId"]}
            />
          </div>
        )},
      ]}
    />
  );
}
