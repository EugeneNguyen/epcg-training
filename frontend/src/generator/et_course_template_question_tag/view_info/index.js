import {useParams} from "react-router-dom";
import ViewEtCourseTemplateQuestionTagGeneral from './general';
import Nav from '../../_components/nav';
import TableEtCourseTemplateQuestionTagLinkList from '../../et_course_template_question_tag_link/table_list';

export default function ViewEtCourseTemplateQuestionTagInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewEtCourseTemplateQuestionTagGeneral objectId={objectId} />},
        {id: 'questions', label: 'Questions', content: (
          <div className="mt-3">
            <TableEtCourseTemplateQuestionTagLinkList
              relationshipName="questions"
              where={{questionTagId: objectId}}
              excludeColumns={["questionTagId"]}
            />
          </div>
        )},
      ]}
    />
  );
}
