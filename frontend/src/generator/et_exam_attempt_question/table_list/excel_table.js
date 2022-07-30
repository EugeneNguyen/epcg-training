import {useQuery} from "@apollo/client";
import {get} from 'lodash';
import PropTypes from 'prop-types';
import API from '../apis';
import {Table, THead, TBody, TH, TR, Cell} from '../../_components/ter_table';

EtExamAttemptQuestionTerTable.defaultProps = {
  excludeColumns: [],
};

EtExamAttemptQuestionTerTable.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number,
  where: PropTypes.object,
  searchBy: PropTypes.object,
  didLoadData: PropTypes.func,
  excludeColumns: PropTypes.array,
};

export default function EtExamAttemptQuestionTerTable(props) {
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
          <TH hidden={props.excludeColumns.includes("id")}>Id</TH>
          <TH hidden={props.excludeColumns.includes("attemptId")}>Attempt Id</TH>
          <TH hidden={props.excludeColumns.includes("questionId")}>Question Id</TH>
          <TH hidden={props.excludeColumns.includes("order")}>Order</TH>
          <TH hidden={props.excludeColumns.includes("displayedQuestionData")}>Displayed Question Data</TH>
          <TH hidden={props.excludeColumns.includes("fullQuestionData")}>Full Question Data</TH>
          <TH hidden={props.excludeColumns.includes("answer")}>Answer</TH>
          <TH hidden={props.excludeColumns.includes("rawAnswer")}>Raw Answer</TH>
          <TH hidden={props.excludeColumns.includes("correct")}>Correct</TH>
          <TH hidden={props.excludeColumns.includes("flag")}>Flag</TH>
          <TH hidden={props.excludeColumns.includes("startTime")}>Start Time</TH>
          <TH hidden={props.excludeColumns.includes("endTime")}>End Time</TH>
        </TR>
      </THead>
      <TBody>
      {data && data.data.rows.map(item => (
        <TR key={item.id} hover>
          <Cell
            hidden={props.excludeColumns.includes("id")}
            type="CHAR(36)"
            value={get(item, 'id')}
          />
          <Cell
            hidden={props.excludeColumns.includes("attemptId")}
            type="CHAR(36)"
            value={get(item, 'attemptId')}
          />
          <Cell
            hidden={props.excludeColumns.includes("questionId")}
            type="CHAR(36)"
            value={get(item, 'questionId')}
          />
          <Cell
            hidden={props.excludeColumns.includes("order")}
            type="INT"
            value={get(item, 'order')}
          />
          <Cell
            hidden={props.excludeColumns.includes("displayedQuestionData")}
            type="TEXT"
            value={get(item, 'displayedQuestionData')}
          />
          <Cell
            hidden={props.excludeColumns.includes("fullQuestionData")}
            type="TEXT"
            value={get(item, 'fullQuestionData')}
          />
          <Cell
            hidden={props.excludeColumns.includes("answer")}
            type="VARCHAR(255)"
            value={get(item, 'answer')}
          />
          <Cell
            hidden={props.excludeColumns.includes("rawAnswer")}
            type="VARCHAR(255)"
            value={get(item, 'rawAnswer')}
          />
          <Cell
            hidden={props.excludeColumns.includes("correct")}
            type="TINYINT(1)"
            value={get(item, 'correct')}
          />
          <Cell
            hidden={props.excludeColumns.includes("flag")}
            type="TINYINT(1)"
            value={get(item, 'flag')}
          />
          <Cell
            hidden={props.excludeColumns.includes("startTime")}
            type="DATETIME"
            value={get(item, 'startTime')}
          />
          <Cell
            hidden={props.excludeColumns.includes("endTime")}
            type="DATETIME"
            value={get(item, 'endTime')}
          />
        </TR>
      ))}
      </TBody>
    </Table>
  );
}
