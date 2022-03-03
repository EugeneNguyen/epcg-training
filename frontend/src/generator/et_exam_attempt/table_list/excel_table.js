import {useQuery} from "@apollo/client";
import {get} from 'lodash';
import PropTypes from 'prop-types';
import API from '../apis';
import {Table, THead, TBody, TH, TR, Cell} from '../../_components/ter_table';

EtExamAttemptTerTable.defaultProps = {
  excludeColumns: [],
};

EtExamAttemptTerTable.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number,
  where: PropTypes.object,
  searchBy: PropTypes.object,
  didLoadData: PropTypes.func,
};

export default function EtExamAttemptTerTable(props) {
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
          <TH>User</TH>
          <TH>Exam</TH>
          <TH>Template Exam</TH>
          <TH>Score</TH>
          <TH>Duration</TH>
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
            link={`/etExamAttempt/${item.id}`}
          />
          <Cell
            type="CHAR(36)"
            value={get(item, 'user.username')}
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'exam.name')}
          />
          <Cell
            type="CHAR(36)"
            value={get(item, 'templateExam.name')}
          />
          <Cell
            type="INT"
            value={get(item, 'score')}
          />
          <Cell
            type="INT"
            value={get(item, 'duration')}
            link={`http://localhost:4000/#/exam/attempts/${item.id}`}
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
