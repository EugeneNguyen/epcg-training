import {Box, Cell, Table, TBody, TH, THead, useQuery} from "../../../../../generator/_components";
import API from './api';
import CellDatetime from "../../../../../generator/_components/table/cell/cell_datetime";
import classNames from "classnames";

export default function CourseMateBox({examId}) {
  const {data, error, loading} = useQuery(API.GET_EXAM_BY_ID, {variables: {id: examId}});

  if (loading) return "Loading ...";
  if (error) return "Error ...";

  return (
    <Box title="Members in my course">
      <Table>
        <THead>
          <tr>
            <TH>#</TH>
            <TH>Member</TH>
            <TH>Result</TH>
            <TH>Finished time</TH>
          </tr>
        </THead>
        <TBody>
          {data.data.course.enrolls.map((enroll, index) => (
            <CellEnroll enroll={enroll} key={enroll.id} index={index}/>
          ))}
        </TBody>
      </Table>
    </Box>
  );
}

function CellEnroll({enroll, index}) {
  const {examAttempts} = enroll.user;
  const name = enroll.user.name || enroll.user.username;
  if (examAttempts.length == 0) {
    return (
      <tr>
        <Cell>{index + 1}</Cell>
        <Cell>{name}</Cell>
        <Cell>---</Cell>
        <Cell>---</Cell>
      </tr>
    )
  }

  const bestAttempt = examAttempts.reduce((a, b) => a.numCorrect > b.numCorrect ? a : b);

  if (!bestAttempt.startTime) {
    return (
      <tr>
        <Cell>{index + 1}</Cell>
        <Cell>{name}</Cell>
        <Cell>---</Cell>
        <Cell>---</Cell>
      </tr>
    )
  }

  if (!bestAttempt.endTime) {
    return (
      <tr className="bg-yellow-100">
        <Cell>{index + 1}</Cell>
        <Cell>{name}</Cell>
        <Cell>---</Cell>
        <Cell>In Progress</Cell>
      </tr>
    )
  }

  const percentage = bestAttempt.numCorrect * 100 / bestAttempt.numQuestion;

  return (
    <tr className={classNames(
      {'bg-green-100': percentage >= 70},
      {'bg-red-100': percentage < 70},
    )}>
      <Cell>{index + 1}</Cell>
      <Cell>{name}</Cell>
      <Cell>
        {percentage}%
      </Cell>
      <CellDatetime value={bestAttempt.endTime} dateFormat="lll" />
    </tr>
  )
}