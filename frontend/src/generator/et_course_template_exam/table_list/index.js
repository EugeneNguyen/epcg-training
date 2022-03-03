import {useState} from 'react';
import {useLocation} from 'react-router-dom';
import path from 'path';
import {Box, ButtonLink, Button} from '../../_components';
import {Form, Input} from '../../_components/form';
import Paginator from '../../_components/paginator';
import EtCourseTemplateExamTerTable from './excel_table';
import EtCourseTemplateExamTable from './table';

export default function TableEtCourseTemplateExamList({where, excludeColumns, relationshipName}) {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [excelTable, setExcelTable] = useState(false);
  const [searchBy, setSearchBy] = useState();
  const location = useLocation();
  let refetch = null;
  const Table = excelTable ? EtCourseTemplateExamTerTable : EtCourseTemplateExamTable;
  return (
    <div className="space-y-4">
    <Button onClick={() => setExcelTable(!excelTable)}>Switch</Button>
      <div className="flex flex-row-reverse">
        <Form className="w-4/12" onSubmitParams={({searchBy}) => setSearchBy(searchBy)}>
          <Input
            name="searchBy"
            placeholder="Search by name"
          />
        </Form>
      </div>
      <Box title="List EtCourseTemplateExam">
        <Table
          limit={limit}
          offset={offset}
          where={where}
          relationshipName={relationshipName}
          pathname={location.pathname}
          excludeColumns={excludeColumns}
          onRefRefetch={ref => refetch = ref}
          didLoadData={result => setTotal(result.data.pagination.total)}
          searchBy={searchBy || undefined}
        />
        <Paginator
          total={total}
          offset={offset}
          limit={limit}
          onChangePage={page => setOffset(page * limit)}
          onChangeLimit={limit => setLimit(limit)}
          refetch={() => refetch()}
        />
      </Box>
      {relationshipName ? (
        <ButtonLink to={path.join(location.pathname, relationshipName, 'add')} color="primary">Add</ButtonLink>
      ) : (
        <ButtonLink to={path.join(location.pathname, 'add')} color="primary">Add</ButtonLink>
      )}
    </div>
  );
}
