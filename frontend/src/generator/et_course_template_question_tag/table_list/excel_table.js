import {useQuery} from "@apollo/client";
import {get} from 'lodash';
import PropTypes from 'prop-types';
import API from '../apis';
import {Table, THead, TBody, TH, TR, Cell} from '../../_components/ter_table';

EtCourseTemplateQuestionTagTerTable.defaultProps = {
  excludeColumns: [],
};

EtCourseTemplateQuestionTagTerTable.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number,
  where: PropTypes.object,
  searchBy: PropTypes.object,
  didLoadData: PropTypes.func,
};

export default function EtCourseTemplateQuestionTagTerTable(props) {
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
          <TH size="6">Name</TH>
          <TH>Courese Template</TH>
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
            size="6"
            link={`/etCourseTemplateQuestionTag/${item.id}`}
            editId={item.id}
            editKey="name"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
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
