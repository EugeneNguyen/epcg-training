import {useQuery} from "@apollo/client";
import API from '../apis';
import {ButtonLink} from '../../_components/button';
import Cell from '../../_components/table/cell';
import {Table, THead, TH} from '../../_components';
import ButtonDelete from './button_delete';
import _ from 'lodash';
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
      <tr>
        {excludeColumns.includes("id") || (
          <TH className="">
            Id
          </TH>
        )}
        {excludeColumns.includes("attemptId") || (
          <TH className="">
            Attempt Id
          </TH>
        )}
        {excludeColumns.includes("questionId") || (
          <TH className="">
            Question Id
          </TH>
        )}
        {excludeColumns.includes("order") || (
          <TH className="">
            Order
          </TH>
        )}
        {excludeColumns.includes("displayedQuestionData") || (
          <TH className="">
            Displayed Question Data
          </TH>
        )}
        {excludeColumns.includes("fullQuestionData") || (
          <TH className="">
            Full Question Data
          </TH>
        )}
        {excludeColumns.includes("answer") || (
          <TH className="">
            Answer
          </TH>
        )}
        {excludeColumns.includes("rawAnswer") || (
          <TH className="">
            Raw Answer
          </TH>
        )}
        {excludeColumns.includes("correct") || (
          <TH className="">
            Correct
          </TH>
        )}
        {excludeColumns.includes("flag") || (
          <TH className="">
            Flag
          </TH>
        )}
        {excludeColumns.includes("startTime") || (
          <TH className="">
            Start Time
          </TH>
        )}
        {excludeColumns.includes("endTime") || (
          <TH className="">
            End Time
          </TH>
        )}
        <TH className="w-30">
          Action
        </TH>
      </tr>
      </THead>
      <tbody class="bg-white divide-y divide-gray-200">
      {data && data.data.rows.map(item => (
      <tr key={item.id}>
          {excludeColumns.includes("id") || (
          <Cell
            type="CHAR(36)"
            value={_.get(item, 'id')}
          />
        )}
          {excludeColumns.includes("attemptId") || (
          <Cell
            type="CHAR(36)"
            value={_.get(item, 'attemptId')}
          />
        )}
          {excludeColumns.includes("questionId") || (
          <Cell
            type="CHAR(36)"
            value={_.get(item, 'questionId')}
          />
        )}
          {excludeColumns.includes("order") || (
          <Cell
            type="INT"
            value={_.get(item, 'order')}
          />
        )}
          {excludeColumns.includes("displayedQuestionData") || (
          <Cell
            type="TEXT"
            value={_.get(item, 'displayedQuestionData')}
          />
        )}
          {excludeColumns.includes("fullQuestionData") || (
          <Cell
            type="TEXT"
            value={_.get(item, 'fullQuestionData')}
          />
        )}
          {excludeColumns.includes("answer") || (
          <Cell
            type="VARCHAR(255)"
            value={_.get(item, 'answer')}
          />
        )}
          {excludeColumns.includes("rawAnswer") || (
          <Cell
            type="VARCHAR(255)"
            value={_.get(item, 'rawAnswer')}
          />
        )}
          {excludeColumns.includes("correct") || (
          <Cell
            type="TINYINT(1)"
            value={_.get(item, 'correct')}
          />
        )}
          {excludeColumns.includes("flag") || (
          <Cell
            type="TINYINT(1)"
            value={_.get(item, 'flag')}
          />
        )}
          {excludeColumns.includes("startTime") || (
          <Cell
            type="DATETIME"
            value={_.get(item, 'startTime')}
          />
        )}
          {excludeColumns.includes("endTime") || (
          <Cell
            type="DATETIME"
            value={_.get(item, 'endTime')}
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
    </Table>
  );
}
