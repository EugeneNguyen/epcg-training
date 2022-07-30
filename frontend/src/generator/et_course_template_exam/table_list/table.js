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
        <TH
          hidden={excludeColumns.includes("name")}
          size=""
        >
          Name
        </TH>
        <TH
          hidden={excludeColumns.includes("duration")}
          size=""
        >
          Duration
        </TH>
        <TH
          hidden={excludeColumns.includes("numberOfQuestion")}
          size=""
        >
          Number Of Question
        </TH>
        <TH
          hidden={excludeColumns.includes("unlimitedTime")}
          size=""
        >
          Unlimited Time
        </TH>
        <TH
          hidden={excludeColumns.includes("randomQuestionOrder")}
          size=""
        >
          Random Question Order
        </TH>
        <TH
          hidden={excludeColumns.includes("randomChoiceOrder")}
          size=""
        >
          Random Choice Order
        </TH>
        <TH
          hidden={excludeColumns.includes("isPublic")}
          size=""
        >
          Is Public
        </TH>
        <TH
          hidden={excludeColumns.includes("courseTemplateId")}
          size=""
        >
          Course Template
        </TH>
        <TH className="w-30">
          Action
        </TH>
      </TR>
      </THead>
      <TBody>
      {data && data.data.rows.map(item => (
      <TR key={item.id} hover>
          <Cell
            hidden={excludeColumns.includes("name")}
            size=""
            type="VARCHAR(255)"
            value={get(item, 'name')}
            link={`/etCourseTemplateExam/${item.id}`}
          />
          <Cell
            hidden={excludeColumns.includes("duration")}
            size=""
            type="INT"
            value={get(item, 'duration')}
            id={item.id}
            valueKey="duration"
            mutation={API.EDIT}
            onCompleted={() => refetch()}
            editable
          />
          <Cell
            hidden={excludeColumns.includes("numberOfQuestion")}
            size=""
            type="INT"
            value={get(item, 'numberOfQuestion')}
            id={item.id}
            valueKey="numberOfQuestion"
            mutation={API.EDIT}
            onCompleted={() => refetch()}
            editable
          />
          <Cell
            hidden={excludeColumns.includes("unlimitedTime")}
            size=""
            type="TINYINT(1)"
            value={get(item, 'unlimitedTime')}
          />
          <Cell
            hidden={excludeColumns.includes("randomQuestionOrder")}
            size=""
            type="TINYINT(1)"
            value={get(item, 'randomQuestionOrder')}
          />
          <Cell
            hidden={excludeColumns.includes("randomChoiceOrder")}
            size=""
            type="TINYINT(1)"
            value={get(item, 'randomChoiceOrder')}
          />
          <Cell
            hidden={excludeColumns.includes("isPublic")}
            size=""
            type="TINYINT(1)"
            value={get(item, 'isPublic')}
          />
          <Cell
            hidden={excludeColumns.includes("courseTemplateId")}
            size=""
            type="CHAR(36)"
            value={get(item, 'courseTemplate.name')}
          />
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
