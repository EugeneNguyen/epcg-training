import {Box, Cell, Table, TBody, TH, THead} from "../../../../generator/_components";
import {useQuery} from "@apollo/client";
import {useParams} from "react-router-dom";
import API from "./api";
import CellLink from "../../../../generator/_components/table/cell/cell_link";
import AuthHelper from "../../../auth/helper";

export default function CourseExamBox() {
  const {id} = useParams();
  const {data, loading, error} = useQuery(
    API.GET_EXAM,
    {
      ...API.DEFAULT_OPTIONS,
      variables: {
        where: {
          courseId: id,
          token: AuthHelper.token(),
        }
      },
    },
  );

  if (loading) {
    return <Box title="Exams" padding>Loading</Box>;
  }

  if (error) {
    return <Box title="Exams" padding>{error.message}</Box>;
  }

  if (!data) {
    return <Box title="Exams" padding>No Data</Box>;
  }

  data.data.map(exam => {
    const bestAttempt = exam.attempts.find((prev, current) => {
      return (prev.questions.filter(q => q.corect).length > current.questions.filter(q => q.corect).length) ? prev : current
    });
    if (bestAttempt.endTime !== null) {
      exam.bestAttempt = bestAttempt;
      exam.correct = bestAttempt.questions.filter(q => q.correct).length;
      exam.numQuestion = bestAttempt.questions.length;
      exam.score = parseInt(exam.correct * 100 / exam.numQuestion);
    }
  })

  return (
    <Box title="Exams">
      <Table>
        <THead>
          <tr>
            <TH>Name</TH>
            <TH>Duration (mins)</TH>
            <TH># of Questions</TH>
            <TH>Result</TH>
          </tr>
        </THead>
        <TBody>
          {data.data.map(exam => (
            <tr>
              <CellLink link={`/exam/${exam.id}`} value={exam.name}/>
              <Cell value={exam.courseTemplateExam.duration} />
              <Cell value={exam.courseTemplateExam.numberOfQuestion} />
              <Cell value={exam.courseTemplateExam.numberOfQuestion} />
              {exam.bestAttempt ? (
                <Cell value={`${exam.score}% (${exam.correct}/${exam.numQuestion})`}/>
              ) : (
                <Cell value=""/>
              )}
            </tr>
          ))}
        </TBody>
      </Table>
    </Box>
  );
}