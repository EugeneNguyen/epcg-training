import {useQuery} from "@apollo/client";
import API from '../apis';
import {ButtonLink} from '../../_components/button';
import Cell from '../../_components/table/cell';
import {Table, THead, TBody, TH, TR} from '../../_components';
import ButtonDelete from './button_delete';
import {get} from 'lodash';
import path from 'path';

EtExamAttemptQuestionTable.defaultProps = {
  excludeColumns: [],
};

export default function EtExamAttemptQuestionTable({limit, offset, didLoadData, onRefRefetch, where, excludeColumns, pathname, relationshipName}) {
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
        <TH
          hidden={excludeColumns.includes("id")}
          size=""
        >
          Id
        </TH>
        <TH
          hidden={excludeColumns.includes("attemptId")}
          size=""
        >
          Attempt Id
        </TH>
        <TH
          hidden={excludeColumns.includes("questionId")}
          size=""
        >
          Question Id
        </TH>
        <TH
          hidden={excludeColumns.includes("order")}
          size=""
        >
          Order
        </TH>
        <TH
          hidden={excludeColumns.includes("displayedQuestionData")}
          size=""
        >
          Displayed Question Data
        </TH>
        <TH
          hidden={excludeColumns.includes("fullQuestionData")}
          size=""
        >
          Full Question Data
        </TH>
        <TH
          hidden={excludeColumns.includes("answer")}
          size=""
        >
          Answer
        </TH>
        <TH
          hidden={excludeColumns.includes("rawAnswer")}
          size=""
        >
          Raw Answer
        </TH>
        <TH
          hidden={excludeColumns.includes("correct")}
          size=""
        >
          Correct
        </TH>
        <TH
          hidden={excludeColumns.includes("flag")}
          size=""
        >
          Flag
        </TH>
        <TH
          hidden={excludeColumns.includes("startTime")}
          size=""
        >
          Start Time
        </TH>
        <TH
          hidden={excludeColumns.includes("endTime")}
          size=""
        >
          End Time
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
            hidden={excludeColumns.includes("id")}
            size=""
            type="CHAR(36)"
            value={get(item, 'id')}
          />
          <Cell
            hidden={excludeColumns.includes("attemptId")}
            size=""
            type="CHAR(36)"
            value={get(item, 'attemptId')}
          />
          <Cell
            hidden={excludeColumns.includes("questionId")}
            size=""
            type="CHAR(36)"
            value={get(item, 'questionId')}
          />
          <Cell
            hidden={excludeColumns.includes("order")}
            size=""
            type="INT"
            value={get(item, 'order')}
          />
          <Cell
            hidden={excludeColumns.includes("displayedQuestionData")}
            size=""
            type="TEXT"
            value={get(item, 'displayedQuestionData')}
          />
          <Cell
            hidden={excludeColumns.includes("fullQuestionData")}
            size=""
            type="TEXT"
            value={get(item, 'fullQuestionData')}
          />
          <Cell
            hidden={excludeColumns.includes("answer")}
            size=""
            type="VARCHAR(255)"
            value={get(item, 'answer')}
          />
          <Cell
            hidden={excludeColumns.includes("rawAnswer")}
            size=""
            type="VARCHAR(255)"
            value={get(item, 'rawAnswer')}
          />
          <Cell
            hidden={excludeColumns.includes("correct")}
            size=""
            type="TINYINT(1)"
            value={get(item, 'correct')}
          />
          <Cell
            hidden={excludeColumns.includes("flag")}
            size=""
            type="TINYINT(1)"
            value={get(item, 'flag')}
          />
          <Cell
            hidden={excludeColumns.includes("startTime")}
            size=""
            type="DATETIME"
            value={get(item, 'startTime')}
          />
          <Cell
            hidden={excludeColumns.includes("endTime")}
            size=""
            type="DATETIME"
            value={get(item, 'endTime')}
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
