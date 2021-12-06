import {Cell, Table, TBody, TH, THead, useQuery} from "../../../../../generator/_components";
import API from './api';
import classNames from "classnames";

export default function CourseMateAnalytic({question}) {
  const {data, error, loading} = useQuery(API.GET_ATTEMPT_BY_ID, {variables: {id: question.attemptId}});

  if (loading) return "Loading";
  if (error) return "Error";

  const {enrolls} = data.data.exam.course;

  return (
    <Table>
      <THead>
        <tr>
          <TH>Member</TH>
          <TH>Result</TH>
        </tr>
      </THead>
      <TBody>
        {enrolls.map((enroll, index) => (
          <CourseMateCell
            key={enroll.id}
            index={index}
            enroll={enroll}
            qOrder={question.order}
            examId={data.data.exam.id}
          />
        ))}
      </TBody>
    </Table>
  );
}

function CourseMateCell({enroll, index, qOrder, examId}) {
  const {examAttempts} = enroll.user;
  const name = enroll.user.name || enroll.user.username;
  const attempts = examAttempts.filter(a => a.examId === examId);
  if (attempts.length == 0) {
    return (
      <tr>
        <Cell>{index + 1}</Cell>
        <Cell>{name}</Cell>
        <Cell>---</Cell>
      </tr>
    )
  }
  const bestAttempt = attempts.reduce((a, b) => a.numCorrect > b.numCorrect ? a : b);

  if (!bestAttempt.startTime || !bestAttempt.endTime) {
    return (
      <tr>
        <Cell>{index + 1}</Cell>
        <Cell>{name}</Cell>
        <Cell>---</Cell>
      </tr>
    )
  }

  const question = bestAttempt.questions.find(q => q.order === qOrder);
  if (!question) return "Cannot find order";

  return (
    <tr className={classNames(
      {'bg-green-100': question.correct},
      {'bg-red-100': !question.correct},
    )}>
      <Cell>{index + 1}</Cell>
      <Cell>{name}</Cell>
      <Cell>
        {question.answer}
      </Cell>
    </tr>
  )
}
