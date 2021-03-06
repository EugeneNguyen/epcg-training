import {useQuery} from "@apollo/client";
import API from '../apis';
import {ButtonLink} from '../../_components/button';
import Cell from '../../_components/table/cell';
import {Table, THead, TBody, TH, TR} from '../../_components';
import ButtonDelete from './button_delete';
import {get} from 'lodash';
import path from 'path';

EtCourseTemplateExamTable.defaultProps = {
  excludeColumns: [],
};

export default function EtCourseTemplateExamTable({limit, offset, didLoadData, onRefRefetch, where, excludeColumns, pathname, relationshipName, searchBy}) {
  const {loading, error, data, refetch} = useQuery(API.ALL_WITH_PAGE, {
    ...API.DEFAULT_OPTIONS,
    variables: {
      pagination: {limit, offset},
      where,
      searchBy,
    },
    onCompleted: didLoadData,
  });
  onRefRefetch(refetch);

  return (
    <Table>
      <THead>
      <TR>
        {excludeColumns.includes("name") || (
          <TH className="">
            Name
          </TH>
        )}
        {excludeColumns.includes("duration") || (
          <TH className="">
            Duration
          </TH>
        )}
        {excludeColumns.includes("numberOfQuestion") || (
          <TH className="">
            Number Of Question
          </TH>
        )}
        {excludeColumns.includes("unlimitedTime") || (
          <TH className="">
            Unlimited Time
          </TH>
        )}
        {excludeColumns.includes("randomQuestionOrder") || (
          <TH className="">
            Random Question Order
          </TH>
        )}
        {excludeColumns.includes("randomChoiceOrder") || (
          <TH className="">
            Random Choice Order
          </TH>
        )}
        {excludeColumns.includes("isPublic") || (
          <TH className="">
            Is Public
          </TH>
        )}
        {excludeColumns.includes("courseTemplateId") || (
          <TH className="">
            Course Template
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
          {excludeColumns.includes("name") || (
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'name')}
            link={`/etCourseTemplateExam/${item.id}`}
          />
        )}
          {excludeColumns.includes("duration") || (
          <Cell
            type="INT"
            value={get(item, 'duration')}
            id={item.id}
            valueKey="duration"
            mutation={API.EDIT}
            onCompleted={() => refetch()}
            editable
          />
        )}
          {excludeColumns.includes("numberOfQuestion") || (
          <Cell
            type="INT"
            value={get(item, 'numberOfQuestion')}
            id={item.id}
            valueKey="numberOfQuestion"
            mutation={API.EDIT}
            onCompleted={() => refetch()}
            editable
          />
        )}
          {excludeColumns.includes("unlimitedTime") || (
          <Cell
            type="TINYINT(1)"
            value={get(item, 'unlimitedTime')}
          />
        )}
          {excludeColumns.includes("randomQuestionOrder") || (
          <Cell
            type="TINYINT(1)"
            value={get(item, 'randomQuestionOrder')}
          />
        )}
          {excludeColumns.includes("randomChoiceOrder") || (
          <Cell
            type="TINYINT(1)"
            value={get(item, 'randomChoiceOrder')}
          />
        )}
          {excludeColumns.includes("isPublic") || (
          <Cell
            type="TINYINT(1)"
            value={get(item, 'isPublic')}
          />
        )}
          {excludeColumns.includes("courseTemplateId") || (
          <Cell
            type="CHAR(36)"
            value={get(item, 'courseTemplate.name')}
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
