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
  excludeColumns: PropTypes.array,
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
          <TH hidden={props.excludeColumns.includes("id")}>Id</TH>
          <TH hidden={props.excludeColumns.includes("examId")}>Exam</TH>
          <TH hidden={props.excludeColumns.includes("templateExamId")}>Template Exam</TH>
          <TH hidden={props.excludeColumns.includes("score")}>Score</TH>
          <TH hidden={props.excludeColumns.includes("duration")}>Duration</TH>
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
            link={`/etExamAttempt/${item.id}`}
          />
          <Cell
            hidden={props.excludeColumns.includes("examId")}
            type="VARCHAR(255)"
            value={get(item, 'exam.name')}
          />
          <Cell
            hidden={props.excludeColumns.includes("templateExamId")}
            type="CHAR(36)"
            value={get(item, 'templateExam.name')}
          />
          <Cell
            hidden={props.excludeColumns.includes("score")}
            type="INT"
            value={get(item, 'score')}
          />
          <Cell
            hidden={props.excludeColumns.includes("duration")}
            type="INT"
            value={get(item, 'duration')}
            link={`http://localhost:4000/#/exam/attempts/${item.id}`}
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
