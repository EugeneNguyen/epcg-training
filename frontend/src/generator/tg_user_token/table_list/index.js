import {useState} from 'react';
import {useLocation} from 'react-router-dom';
import {ArrowRepeat} from 'react-bootstrap-icons';
import {ButtonLink, Button} from '../../_components/button';
import Paginator from '../../_components/paginator';
import TgUserTokenTable from './table';
import path from 'path';

export default function TableTgUserTokenList({where, excludeColumns, relationshipName}) {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const location = useLocation();
  let refetch = null;
  return (
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 pb-5 align-middle inline-block min-w-full sm:px-6 lg:px-8 space-y-5">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <TgUserTokenTable
              limit={limit}
              offset={offset}
              where={where}
              relationshipName={relationshipName}
              pathname={location.pathname}
              excludeColumns={excludeColumns}
              onRefRefetch={ref => refetch = ref}
              didLoadData={result => setTotal(result.data.pagination.total)}
            />
            <Paginator
              total={total}
              offset={offset}
              limit={limit}
              onChangePage={page => setOffset(page * limit)}
              onChangeLimit={limit => setLimit(limit)}
              refetch={() => refetch()}
            />
          </div>
          <div className="w-full flex flex-wrap justify-between">
            {relationshipName ? (
            <ButtonLink to={path.join(location.pathname, relationshipName, 'add')} color="primary">Add</ButtonLink>
            ) : (
            <ButtonLink to={path.join(location.pathname, 'add')} color="primary">Add</ButtonLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
