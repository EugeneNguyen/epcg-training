import {Box, Cell, Table, TBody, TH, THead, useQuery} from "../../../../generator/_components";
import {useParams} from "react-router-dom";
import API from "./api";
import CellLink from "../../../../generator/_components/table/cell/cell_link";
import AuthHelper from "../../../auth/helper";

export default function ExamListBox() {
  const {id} = useParams();
  const {data, loading, error} = useQuery(
    API.GET_EXAM,
    {
      variables: {
        where: {
          courseId: id,
        },
        token: AuthHelper.token(),
      },
    },
  );

  if (loading) return <Box title="All Exams" padding>Loading</Box>;
  if (error) return <Box title="All Exams" padding>{error.message}</Box>;
  if (!data) return <Box title="All Exams" padding>No Data</Box>;

  data.data.map(exam => {
    const attempts = data.me.examAttempts.filter(attempt => attempt.templateExamId == exam.courseTemplateExam.id);
    if (attempts.length == 0) return;

    const bestAttempt = attempts.reduce((a, b) => (a.score > b.score) ? a : b);
    if (bestAttempt.endTime === null) return

    exam.bestAttempt = bestAttempt;
  })

  return (
    <Box title="All Exams">
      <Table>
        <THead>
          <tr>
            <TH>Name</TH>
            <TH>Duration (mins)</TH>
            <TH># of Questions</TH>
            <TH>Score</TH>
          </tr>
        </THead>
        <TBody>
          {data.data.map(exam => (
            <tr>
              <CellLink link={`/exam/${exam.id}`}>{exam.name}</CellLink>
              <Cell>{exam.courseTemplateExam.duration}</Cell>
              <Cell>{exam.courseTemplateExam.numberOfQuestion}</Cell>
              {exam.bestAttempt ? (
                <Cell>{exam.bestAttempt.score}%</Cell>
              ) : (
                <Cell>N/A</Cell>
              )}
            </tr>
          ))}
        </TBody>
      </Table>
    </Box>
  );
}