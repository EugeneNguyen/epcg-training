import {useParams} from "react-router-dom";
import ViewEtCourseTemplateGeneral from './general';
import Nav from '../../_components/nav';
import TableEtCourseTemplateQuestionMcqList from '../../et_course_template_question_mcq/table_list';
import TableEtCourseTemplateQuestionSourceList from '../../et_course_template_question_source/table_list';
import TableEtCourseTemplateQuestionTagList from '../../et_course_template_question_tag/table_list';

export default function ViewEtCourseTemplateInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewEtCourseTemplateGeneral objectId={objectId} />},
        {id: 'questions', label: 'Questions', content: (
          <div className="mt-3">
            <TableEtCourseTemplateQuestionMcqList
              relationshipName="questions"
              where={{courseTemplateId: objectId}}
              excludeColumns={["courseTemplateId"]}
            />
          </div>
        )},
        {id: 'questionSources', label: 'Question Source', content: (
          <div className="mt-3">
            <TableEtCourseTemplateQuestionSourceList
              relationshipName="questionSources"
              where={{courseTemplateId: objectId}}
              excludeColumns={["courseTemplateId"]}
            />
          </div>
        )},
        {id: 'tags', label: 'Tags', content: (
          <div className="mt-3">
            <TableEtCourseTemplateQuestionTagList
              relationshipName="tags"
              where={{courseTemplateId: objectId}}
              excludeColumns={["courseTemplateId"]}
            />
          </div>
        )},
      ]}
    />
  );
}
