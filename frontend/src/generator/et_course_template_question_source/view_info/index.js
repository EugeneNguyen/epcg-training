import {useParams} from "react-router-dom";
import ViewEtCourseTemplateQuestionSourceGeneral from './general';
import Nav from '../../_components/nav';
import TableEtCourseTemplateQuestionMcqList from '../../et_course_template_question_mcq/table_list';

export default function ViewEtCourseTemplateQuestionSourceInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewEtCourseTemplateQuestionSourceGeneral objectId={objectId} />},
        {id: 'questions', label: 'Questions', content: (
          <div className="mt-3">
            <TableEtCourseTemplateQuestionMcqList
              relationshipName="questions"
              where={{questionSourceId: objectId}}
              excludeColumns={["questionSourceId"]}
            />
          </div>
        )},
      ]}
    />
  );
}
