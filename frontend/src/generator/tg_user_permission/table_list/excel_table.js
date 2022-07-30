import {useQuery} from "@apollo/client";
import {get} from 'lodash';
import PropTypes from 'prop-types';
import API from '../apis';
import {Table, THead, TBody, TH, TR, Cell} from '../../_components/ter_table';

TgUserPermissionTerTable.defaultProps = {
  excludeColumns: [],
};

TgUserPermissionTerTable.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number,
  where: PropTypes.object,
  searchBy: PropTypes.object,
  didLoadData: PropTypes.func,
  excludeColumns: PropTypes.array,
};

export default function TgUserPermissionTerTable(props) {
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
          <TH hidden={props.excludeColumns.includes("userId")}>User</TH>
          <TH hidden={props.excludeColumns.includes("permissionId")}>Permission</TH>
        </TR>
      </THead>
      <TBody>
      {data && data.data.rows.map(item => (
        <TR key={item.id} hover>
          <Cell
            hidden={props.excludeColumns.includes("userId")}
            type="CHAR(36)"
            value={get(item, 'user.username')}
          />
          <Cell
            hidden={props.excludeColumns.includes("permissionId")}
            type="CHAR(36)"
            value={get(item, 'permission.name')}
          />
        </TR>
      ))}
      </TBody>
    </Table>
  );
}
