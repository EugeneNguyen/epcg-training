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
          <TH className="">
            Id
          </TH>
          <TH className="w-4/12">
            Name
          </TH>
          <TH className="">
            Course
          </TH>
          <TH className="w-4/12">
            Course Template Exam
          </TH>
          <TH className="">
            Created At
          </TH>
          <TH className="">
            Updated At
          </TH>
        </TR>
      </THead>
      <TBody>
      {data && data.data.rows.map(item => (
        <TR key={item.id} hover>
          <Cell
            type="CHAR(36)"
            value={get(item, 'id')}
            editId={item.id}
            editKey="id"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'name')}
            editId={item.id}
            editKey="name"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="CHAR(36)"
            value={get(item, 'course.name')}
            editId={item.id}
            editKey="courseId"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="CHAR(36)"
            value={get(item, 'courseTemplateExam.name')}
            editId={item.id}
            editKey="courseTemplateExamId"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="DATETIME"
            value={get(item, 'createdAt')}
            editId={item.id}
            editKey="createdAt"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="DATETIME"
            value={get(item, 'updatedAt')}
            editId={item.id}
            editKey="updatedAt"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
        </TR>
      ))}
      </TBody>
    </Table>
  );
}
