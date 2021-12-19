import {useQuery} from "@apollo/client";
import API from '../apis';
import {ButtonLink} from '../../_components/button';
import Cell from '../../_components/table/cell';
import {Table, THead, TBody, TH, TR} from '../../_components';
import ButtonDelete from './button_delete';
import {get} from 'lodash';
import path from 'path';

TgFileTable.defaultProps = {
  excludeColumns: [],
};

export default function TgFileTable({limit, offset, didLoadData, onRefRefetch, where, excludeColumns, pathname, relationshipName}) {
  const {loading, error, data, refetch} = useQuery(API.ALL_WITH_PAGE, {
    ...API.DEFAULT_OPTIONS,
    variables: {
      pagination: {limit, offset},
      where,
    },
    onCompleted: didLoadData,
  });
  onRefRefetch(refetch);

  return (
    <Table>
      <THead>
      <TR>
        {excludeColumns.includes("id") || (
          <TH className="">
            Id
          </TH>
        )}
        {excludeColumns.includes("service") || (
          <TH className="">
            Service
          </TH>
        )}
        {excludeColumns.includes("key") || (
          <TH className="">
            Key
          </TH>
        )}
        {excludeColumns.includes("originalName") || (
          <TH className="">
            Original Name
          </TH>
        )}
        {excludeColumns.includes("extension") || (
          <TH className="">
            Extension
          </TH>
        )}
        {excludeColumns.includes("mimeType") || (
          <TH className="">
            Mime Type
          </TH>
        )}
        {excludeColumns.includes("size") || (
          <TH className="">
            Size
          </TH>
        )}
        {excludeColumns.includes("meta") || (
          <TH className="">
            Meta
          </TH>
        )}
        {excludeColumns.includes("ownerUserId") || (
          <TH className="">
            Owner User Id
          </TH>
        )}
        {excludeColumns.includes("createdAt") || (
          <TH className="">
            Created At
          </TH>
        )}
        {excludeColumns.includes("updatedAt") || (
          <TH className="">
            Updated At
          </TH>
        )}
        <TH className="w-30">
          Action
        </TH>
      </TR>
      </THead>
      <TBody>
      {data && data.data.rows.map(item => (
      <TR key={item.id} hover>
          {excludeColumns.includes("id") || (
          <Cell
            type="CHAR(36)"
            value={get(item, 'id')}
            link={`/tgFile/${item.id}`}
          />
        )}
          {excludeColumns.includes("service") || (
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'service')}
          />
        )}
          {excludeColumns.includes("key") || (
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'key')}
          />
        )}
          {excludeColumns.includes("originalName") || (
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'originalName')}
          />
        )}
          {excludeColumns.includes("extension") || (
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'extension')}
          />
        )}
          {excludeColumns.includes("mimeType") || (
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'mimeType')}
          />
        )}
          {excludeColumns.includes("size") || (
          <Cell
            type="INT"
            value={get(item, 'size')}
          />
        )}
          {excludeColumns.includes("meta") || (
          <Cell
            type="TEXT"
            value={get(item, 'meta')}
          />
        )}
          {excludeColumns.includes("ownerUserId") || (
          <Cell
            type="CHAR(36)"
            value={get(item, 'ownerUserId')}
          />
        )}
          {excludeColumns.includes("createdAt") || (
          <Cell
            type="DATETIME"
            value={get(item, 'createdAt')}
          />
        )}
          {excludeColumns.includes("updatedAt") || (
          <Cell
            type="DATETIME"
            value={get(item, 'updatedAt')}
          />
        )}
        <td>
          <ButtonLink to={path.join(pathname, relationshipName || "", item.id, 'edit')} color="primary" size="sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </ButtonLink>
          {' '}
          <ButtonDelete id={item.id} didDelete={refetch} color="danger" size="sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </ButtonDelete>
        </td>
      </TR>
      ))}
      </TBody>
    </Table>
  );
}
