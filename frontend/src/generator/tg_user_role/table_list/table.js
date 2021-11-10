import {useQuery} from "@apollo/client";
import {Table} from 'reactstrap';
import API from '../apis';
import {ButtonLink} from '../../_components/button';
import Cell from '../../_components/table/cell';
import ButtonDelete from './button_delete';
import _ from 'lodash';
import path from 'path';

TgUserRoleTable.defaultProps = {
  excludeColumns: [],
};

export default function TgUserRoleTable({limit, offset, didLoadData, onRefRefetch, where, excludeColumns, pathname, relationshipName}) {
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
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
      <tr>
        {excludeColumns.includes("userId") || (
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            User Id
          </th>
        )}
        {excludeColumns.includes("roleId") || (
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Role Id
          </th>
        )}
        <th
          scope="col"
          class="w-24 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Action
        </th>
      </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
      {data && data.data.rows.map(item => (
      <tr key={item.id}>
          {excludeColumns.includes("userId") || (
          <Cell
            type="CHAR(36)"
            value={_.get(item, 'userId')}
          />
        )}
          {excludeColumns.includes("roleId") || (
          <Cell
            type="CHAR(36)"
            value={_.get(item, 'roleId')}
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
      </tr>
      ))}
      </tbody>
    </table>
  );
}
