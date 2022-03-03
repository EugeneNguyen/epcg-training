import {useQuery} from "@apollo/client";
import {get} from 'lodash';
import PropTypes from 'prop-types';
import API from '../apis';
import {Table, THead, TBody, TH, TR, Cell} from '../../_components/ter_table';

EtCourseTemplateExamTerTable.defaultProps = {
  excludeColumns: [],
};

EtCourseTemplateExamTerTable.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number,
  where: PropTypes.object,
  searchBy: PropTypes.object,
  didLoadData: PropTypes.func,
};

export default function EtCourseTemplateExamTerTable(props) {
  const {loading, error, data, refetch} = useQuery(API.ALL_WITH_PAGE, {
    ...API.DEFAULT_OPTIONS,
    variables: {
      pagination: {limit: props.limit, offset: props.offset},
      where: props.where,
      searchBy: props.searchBy,
    },
    onCompleted: props.didLoadData,
  });

  if (loading && !data) return "Loading";
  if (error) return "Error";

  return (
    <Table>
      <THead>
        <TR>
          <TH>Id</TH>
          <TH>Name</TH>
          <TH>Duration</TH>
          <TH>Number Of Question</TH>
          <TH>Unlimited Time</TH>
          <TH>Random Question Order</TH>
          <TH>Random Choice Order</TH>
          <TH>Is Public</TH>
          <TH>Course Template</TH>
          <TH>Created At</TH>
          <TH>Updated At</TH>
        </TR>
      </THead>
      <TBody>
      {data && data.data.rows.map(item => (
        <TR key={item.id} hover>
          <Cell
            type="CHAR(36)"
            value={get(item, 'id')}
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'name')}
            link={`/etCourseTemplateExam/${item.id}`}
          />
          <Cell
            type="INT"
            value={get(item, 'duration')}
            editId={item.id}
            editKey="duration"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="INT"
            value={get(item, 'numberOfQuestion')}
            editId={item.id}
            editKey="numberOfQuestion"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="TINYINT(1)"
            value={get(item, 'unlimitedTime')}
          />
          <Cell
            type="TINYINT(1)"
            value={get(item, 'randomQuestionOrder')}
          />
          <Cell
            type="TINYINT(1)"
            value={get(item, 'randomChoiceOrder')}
          />
          <Cell
            type="TINYINT(1)"
            value={get(item, 'isPublic')}
          />
          <Cell
            type="CHAR(36)"
            value={get(item, 'courseTemplate.name')}
          />
          <Cell
            type="DATETIME"
            value={get(item, 'createdAt')}
          />
          <Cell
            type="DATETIME"
            value={get(item, 'updatedAt')}
          />
        </TR>
      ))}
      </TBody>
    </Table>
  );
}
