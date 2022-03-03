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
          <TH>Id</TH>
          <TH>Service</TH>
          <TH>Key</TH>
          <TH>Original Name</TH>
          <TH>Extension</TH>
          <TH>Mime Type</TH>
          <TH>Size</TH>
          <TH>Meta</TH>
          <TH>Owner User Id</TH>
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
            link={`/tgFile/${item.id}`}
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'service')}
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'key')}
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'originalName')}
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'extension')}
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'mimeType')}
          />
          <Cell
            type="INT"
            value={get(item, 'size')}
          />
          <Cell
            type="TEXT"
            value={get(item, 'meta')}
          />
          <Cell
            type="CHAR(36)"
            value={get(item, 'ownerUserId')}
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
