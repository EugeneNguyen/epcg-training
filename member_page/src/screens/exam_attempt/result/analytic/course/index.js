import {Box, Cell, Table, TBody, TH, THead, useQuery} from "../../../../../generator/_components";
import API from './api';
import _ from "lodash";

export default function QuestionCourseAnalyticBox({attemptId}) {
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
          </tr>
        </THead>
        <TBody>
          {courseData.data.enrolls.map(enroll => (
            <tr>
              <Cell></Cell>
              <Cell></Cell>
            </tr>
          ))}
        </TBody>
      </Table>
    </Box>
  ) : null;
}
