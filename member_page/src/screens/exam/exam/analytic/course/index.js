import {Box, Cell, Table, TBody, TH, THead, useQuery} from "../../../../../generator/_components";
import API from './api';
import CellDatetime from "../../../../../generator/_components/table/cell/cell_datetime";
import classNames from "classnames";
import AuthHelper from "../../../../auth/helper";
import CellLink from "../../../../../generator/_components/table/cell/cell_link";

export default function CourseMateBox({examId}) {
  const {data, error, loading} = useQuery(API.GET_EXAM_BY_ID, {variables: {id: examId, token: AuthHelper.token()}});

  if (loading) return "Loading ...";
  if (error) return "Error ...";

  const {me, data: {course: { id: courseId }}} = data;
  const isCourseAdmin = me.coursesLink.some(cl => cl.courseId == courseId);

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
            <CellEnroll enroll={enroll} key={enroll.id} index={index} isCourseAdmin={isCourseAdmin}/>
          ))}
        </TBody>
      </Table>
    </Box>
  );
}

function CellEnroll({enroll, index, isCourseAdmin}) {
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

  const bestAttempt = examAttempts.reduce((a, b) => a.score > b.score ? a : b);

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

  return (
    <tr className={classNames(
      {'bg-green-100': bestAttempt.score >= 70},
      {'bg-red-100': bestAttempt.score < 70},
    )}>
      <Cell>{index + 1}</Cell>
      {isCourseAdmin ? (
        <CellLink link={`/exam/attempt/${bestAttempt.id}/result`}>{name}</CellLink>
      ) : (
        <Cell>{name}</Cell>
      )}
      <Cell>
        {bestAttempt.score}%
      </Cell>
      <CellDatetime value={bestAttempt.endTime} dateFormat="lll" />
    </tr>
  )
}