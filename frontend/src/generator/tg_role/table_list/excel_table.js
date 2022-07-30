import {useQuery} from "@apollo/client";
import {get} from 'lodash';
import PropTypes from 'prop-types';
import API from '../apis';
import {Table, THead, TBody, TH, TR, Cell} from '../../_components/ter_table';

TgRoleTerTable.defaultProps = {
  excludeColumns: [],
};

TgRoleTerTable.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number,
  where: PropTypes.object,
  searchBy: PropTypes.object,
  didLoadData: PropTypes.func,
  excludeColumns: PropTypes.array,
};

export default function TgRoleTerTable(props) {
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
          <TH hidden={props.excludeColumns.includes("name")}>Name</TH>
          <TH hidden={props.excludeColumns.includes("description")}>Description</TH>
        </TR>
      </THead>
      <TBody>
      {data && data.data.rows.map(item => (
        <TR key={item.id} hover>
          <Cell
            hidden={props.excludeColumns.includes("name")}
            type="VARCHAR(255)"
            value={get(item, 'name')}
            link={`/tgRole/${item.id}`}
            editId={item.id}
            editKey="name"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            hidden={props.excludeColumns.includes("description")}
            type="VARCHAR(255)"
            value={get(item, 'description')}
            editId={item.id}
            editKey="description"
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
