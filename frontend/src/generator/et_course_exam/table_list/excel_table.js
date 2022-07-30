import {useQuery} from "@apollo/client";
import {get} from 'lodash';
import PropTypes from 'prop-types';
import API from '../apis';
import {Table, THead, TBody, TH, TR, Cell} from '../../_components/ter_table';

EtCourseExamTerTable.defaultProps = {
  excludeColumns: [],
};

EtCourseExamTerTable.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number,
  where: PropTypes.object,
  searchBy: PropTypes.object,
  didLoadData: PropTypes.func,
  excludeColumns: PropTypes.array,
};

export default function EtCourseExamTerTable(props) {
  const {loading, error, data, refetch} = useQuery(API.ALL_WITH_PAGE, {
    ...API.DEFAULT_OPTIONS,
    variables: {
      pagination: {limit: props.limit, offset: props.offset},
      where: props.where,
    },
    onCompleted: props.didLoadData,
  });

  if (loading && !data) return "Loading";
  if (error) return "Error";

  return (
    <Table>
      <THead>
        <TR>
          <TH hidden={props.excludeColumns.includes("name")} size="4">Name</TH>
          <TH hidden={props.excludeColumns.includes("courseId")}>Course</TH>
          <TH hidden={props.excludeColumns.includes("courseTemplateExamId")} size="4">Course Template Exam</TH>
        </TR>
      </THead>
      <TBody>
      {data && data.data.rows.map(item => (
        <TR key={item.id} hover>
          <Cell
            hidden={props.excludeColumns.includes("name")}
            type="VARCHAR(255)"
            value={get(item, 'name')}
            size="4"
            editId={item.id}
            editKey="name"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            hidden={props.excludeColumns.includes("courseId")}
            type="CHAR(36)"
            value={get(item, 'course.name')}
          />
          <Cell
            hidden={props.excludeColumns.includes("courseTemplateExamId")}
            type="CHAR(36)"
            value={get(item, 'courseTemplateExam.name')}
            size="4"
          />
        </TR>
      ))}
      </TBody>
    </Table>
  );
}
