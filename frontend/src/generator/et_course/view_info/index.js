import {useParams} from "react-router-dom";
import ViewEtCourseGeneral from './general';
import Nav from '../../_components/nav';
import TableEtCourseEnrollList from '../../et_course_enroll/table_list';

export default function ViewEtCourseInfo() {
  const { id: objectId } = useParams();

  return (
    <Nav
      defaultTab="info"
      tabs={[
        {id: 'info', label: 'Info', content: <ViewEtCourseGeneral objectId={objectId} />},
        {id: 'enrolls', label: 'Enrolls', content: (
          <div className="mt-3">
            <TableEtCourseEnrollList
              relationshipName="enrolls"
              where={{courseId: objectId}}
              excludeColumns={["courseId"]}
            />
          </div>
        )},
      ]}
    />
  );
}
