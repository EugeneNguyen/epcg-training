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
          <TH>Id</TH>
          <TH>Attempt Id</TH>
          <TH>Question Id</TH>
          <TH>Order</TH>
          <TH>Displayed Question Data</TH>
          <TH>Full Question Data</TH>
          <TH>Answer</TH>
          <TH>Raw Answer</TH>
          <TH>Correct</TH>
          <TH>Flag</TH>
          <TH>Start Time</TH>
          <TH>End Time</TH>
          <TH>Created At</TH>
          <TH>Updated At</TH>
        </TR>
      </THead>
      <TBody>
      {data && data.data.rows.map(item => (
        <TR key={item.id} hover>
          <Cell
            type="CHAR(36)"
            value={get(item, 'id')}
          />
          <Cell
            type="CHAR(36)"
            value={get(item, 'attemptId')}
          />
          <Cell
            type="CHAR(36)"
            value={get(item, 'questionId')}
          />
          <Cell
            type="INT"
            value={get(item, 'order')}
          />
          <Cell
            type="TEXT"
            value={get(item, 'displayedQuestionData')}
          />
          <Cell
            type="TEXT"
            value={get(item, 'fullQuestionData')}
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'answer')}
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'rawAnswer')}
          />
          <Cell
            type="TINYINT(1)"
            value={get(item, 'correct')}
          />
          <Cell
            type="TINYINT(1)"
            value={get(item, 'flag')}
          />
          <Cell
            type="DATETIME"
            value={get(item, 'startTime')}
          />
          <Cell
            type="DATETIME"
            value={get(item, 'endTime')}
          />
          <Cell
            type="DATETIME"
            value={get(item, 'createdAt')}
          />
          <Cell
            type="DATETIME"
            value={get(item, 'updatedAt')}
          />
        </TR>
      ))}
      </TBody>
    </Table>
  );
}
