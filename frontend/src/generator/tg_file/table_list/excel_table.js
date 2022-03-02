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
          <TH className="">
            Id
          </TH>
          <TH className="">
            Service
          </TH>
          <TH className="">
            Key
          </TH>
          <TH className="">
            Original Name
          </TH>
          <TH className="">
            Extension
          </TH>
          <TH className="">
            Mime Type
          </TH>
          <TH className="">
            Size
          </TH>
          <TH className="">
            Meta
          </TH>
          <TH className="">
            Owner User Id
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
            link={`/tgFile/${item.id}`}
            editId={item.id}
            editKey="id"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'service')}
            editId={item.id}
            editKey="service"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'key')}
            editId={item.id}
            editKey="key"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'originalName')}
            editId={item.id}
            editKey="originalName"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'extension')}
            editId={item.id}
            editKey="extension"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'mimeType')}
            editId={item.id}
            editKey="mimeType"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="INT"
            value={get(item, 'size')}
            editId={item.id}
            editKey="size"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="TEXT"
            value={get(item, 'meta')}
            editId={item.id}
            editKey="meta"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="CHAR(36)"
            value={get(item, 'ownerUserId')}
            editId={item.id}
            editKey="ownerUserId"
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
