import {useParams} from "react-router-dom";
import ViewEtCourseTemplateExamGeneral from './general';
import Nav from '../../_components/nav';
import TableEtCourseTemplateExamQuestionList from '../../et_course_template_exam_question/table_list';

export default function ViewEtCourseTemplateExamInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewEtCourseTemplateExamGeneral objectId={objectId} />},
        {id: 'questions', label: 'Questions', content: (
          <div className="mt-3">
            <TableEtCourseTemplateExamQuestionList
              relationshipName="questions"
              where={{examId: objectId}}
              excludeColumns={["examId"]}
            />
          </div>
        )},
      ]}
    />
  );
}
