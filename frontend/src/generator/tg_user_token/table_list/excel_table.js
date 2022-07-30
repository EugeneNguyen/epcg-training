import {useQuery} from "@apollo/client";
import {get} from 'lodash';
import PropTypes from 'prop-types';
import API from '../apis';
import {Table, THead, TBody, TH, TR, Cell} from '../../_components/ter_table';

TgUserTokenTerTable.defaultProps = {
  excludeColumns: [],
};

TgUserTokenTerTable.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number,
  where: PropTypes.object,
  searchBy: PropTypes.object,
  didLoadData: PropTypes.func,
  excludeColumns: PropTypes.array,
};

export default function TgUserTokenTerTable(props) {
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
          <TH hidden={props.excludeColumns.includes("id")}>Id</TH>
          <TH hidden={props.excludeColumns.includes("userId")}>User Id</TH>
          <TH hidden={props.excludeColumns.includes("createdAt")}>Created At</TH>
          <TH hidden={props.excludeColumns.includes("updatedAt")}>Updated At</TH>
        </TR>
      </THead>
      <TBody>
      {data && data.data.rows.map(item => (
        <TR key={item.id} hover>
          <Cell
            hidden={props.excludeColumns.includes("id")}
            type="CHAR(36)"
            value={get(item, 'id')}
          />
          <Cell
            hidden={props.excludeColumns.includes("userId")}
            type="CHAR(36)"
            value={get(item, 'userId')}
          />
          <Cell
            hidden={props.excludeColumns.includes("createdAt")}
            type="DATETIME"
            value={get(item, 'createdAt')}
          />
          <Cell
            hidden={props.excludeColumns.includes("updatedAt")}
            type="DATETIME"
            value={get(item, 'updatedAt')}
          />
        </TR>
      ))}
      </TBody>
    </Table>
  );
}
