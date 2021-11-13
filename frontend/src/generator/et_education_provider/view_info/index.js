import {useParams} from "react-router-dom";
import ViewEtEducationProviderGeneral from './general';
import Nav from '../../_components/nav';
import TableEtCourseTemplateList from '../../et_course_template/table_list';
import TableEtCourseList from '../../et_course/table_list';

export default function ViewEtEducationProviderInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewEtEducationProviderGeneral objectId={objectId} />},
        {id: 'courseTemplates', label: 'Course Templates', content: (
          <div className="mt-3">
            <TableEtCourseTemplateList
              relationshipName="courseTemplates"
              where={{educationProviderId: objectId}}
              excludeColumns={["educationProviderId"]}
            />
          </div>
        )},
        {id: 'courses', label: 'Courses', content: (
          <div className="mt-3">
            <TableEtCourseList
              relationshipName="courses"
              where={{educationProviderId: objectId}}
              excludeColumns={["educationProviderId"]}
            />
          </div>
        )},
      ]}
    />
  );
}
