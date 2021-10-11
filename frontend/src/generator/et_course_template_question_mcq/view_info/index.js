import {useParams} from "react-router-dom";
import ViewEtCourseTemplateQuestionMcqGeneral from './general';
import Nav from '../../_components/nav';
import TableEtCourseTemplateQuestionTagLinkList from '../../et_course_template_question_tag_link/table_list';

export default function ViewEtCourseTemplateQuestionMcqInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewEtCourseTemplateQuestionMcqGeneral objectId={objectId} />},
        {id: 'tags', label: 'Tags', content: (
          <div className="mt-3">
            <TableEtCourseTemplateQuestionTagLinkList
              relationshipName="tags"
              where={{questionId: objectId}}
              excludeColumns={["questionId"]}
            />
          </div>
        )},
      ]}
    />
  );
}
