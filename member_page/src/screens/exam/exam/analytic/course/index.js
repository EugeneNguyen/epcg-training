import {Box, Cell, Table, TBody, TH, THead, useQuery} from "../../../../../generator/_components";
import API from './api';
import _ from "lodash";
import CellDatetime from "../../../../../generator/_components/table/cell/cell_datetime";
import classNames from "classnames";

export default function CourseAnalyticBox({examId}) {
  const {data: examData} = useQuery(API.GET_EXAM_BY_ID, {variables: {id: examId}});
  const {data: courseData} = useQuery(API.GET_COURSE_BY_ID, {
    variables: {
      courseId: _.get(examData, 'data.courseId'),
      courseTemplateExamId: _.get(examData, 'data.courseTemplateExamId')
    },
    skip: !examData
  });

  return courseData ? (
    <Box title="Members in my course">
      <Table>
        <THead>
          <tr>
            <TH>Member</TH>
            <TH>Result</TH>
            <TH>Finished time</TH>
          </tr>
        </THead>
        <TBody>
          {courseData.data.enrolls.map(enroll => (
            <CellEnroll enroll={enroll} key={enroll.id} />
          ))}
        </TBody>
      </Table>
    </Box>
  ) : null;
}

function CellEnroll({enroll}) {
  const {examAttempts} = enroll.user;
  const name = enroll.user.name || enroll.user.username;
  if (examAttempts.length == 0) {
    return (
      <tr>
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
        <Cell>{name}</Cell>
        <Cell>---</Cell>
        <Cell>---</Cell>
      </tr>
    )
  }

  if (!bestAttempt.endTime) {
    return (
      <tr className="bg-yellow-100">
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
      <Cell>{name}</Cell>
      <Cell>
        {percentage}%
      </Cell>
      <CellDatetime value={bestAttempt.endTime} dateFormat="lll" />
    </tr>
  )
}