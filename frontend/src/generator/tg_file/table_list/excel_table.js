import {useQuery} from "@apollo/client";
import {get} from 'lodash';
import PropTypes from 'prop-types';
import API from '../apis';
import {Table, THead, TBody, TH, TR, Cell} from '../../_components/ter_table';

TgFileTerTable.defaultProps = {
  excludeColumns: [],
};

TgFileTerTable.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number,
  where: PropTypes.object,
  searchBy: PropTypes.object,
  didLoadData: PropTypes.func,
  excludeColumns: PropTypes.array,
};

export default function TgFileTerTable(props) {
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
          <TH hidden={props.excludeColumns.includes("service")}>Service</TH>
          <TH hidden={props.excludeColumns.includes("key")}>Key</TH>
          <TH hidden={props.excludeColumns.includes("originalName")}>Original Name</TH>
          <TH hidden={props.excludeColumns.includes("extension")}>Extension</TH>
          <TH hidden={props.excludeColumns.includes("mimeType")}>Mime Type</TH>
          <TH hidden={props.excludeColumns.includes("size")}>Size</TH>
          <TH hidden={props.excludeColumns.includes("meta")}>Meta</TH>
          <TH hidden={props.excludeColumns.includes("ownerUserId")}>Owner User Id</TH>
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
            link={`/tgFile/${item.id}`}
          />
          <Cell
            hidden={props.excludeColumns.includes("service")}
            type="VARCHAR(255)"
            value={get(item, 'service')}
          />
          <Cell
            hidden={props.excludeColumns.includes("key")}
            type="VARCHAR(255)"
            value={get(item, 'key')}
          />
          <Cell
            hidden={props.excludeColumns.includes("originalName")}
            type="VARCHAR(255)"
            value={get(item, 'originalName')}
          />
          <Cell
            hidden={props.excludeColumns.includes("extension")}
            type="VARCHAR(255)"
            value={get(item, 'extension')}
          />
          <Cell
            hidden={props.excludeColumns.includes("mimeType")}
            type="VARCHAR(255)"
            value={get(item, 'mimeType')}
          />
          <Cell
            hidden={props.excludeColumns.includes("size")}
            type="INT"
            value={get(item, 'size')}
          />
          <Cell
            hidden={props.excludeColumns.includes("meta")}
            type="TEXT"
            value={get(item, 'meta')}
          />
          <Cell
            hidden={props.excludeColumns.includes("ownerUserId")}
            type="CHAR(36)"
            value={get(item, 'ownerUserId')}
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
