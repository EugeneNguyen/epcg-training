import {useQuery} from "../../../../../generator/_components";
import API from './api';
import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default function GeneralAnalyticBox({attemptId, qOrder}) {
  const {data, error, loading} = useQuery(API.GET_ATTEMPT_BY_ID, {variables: {id: attemptId}});

  if (loading) return "Loading";
  if (error) return "Error";

  const {enrolls} = data.data.exam.course;
  const questions = [
    {answer: 'A', number: 0, correct: 0},
    {answer: 'B', number: 0, correct: 0},
    {answer: 'C', number: 0, correct: 0},
    {answer: 'D', number: 0, correct: 0},
  ];
  for (const enroll of enrolls) {
    for (const attempt of enroll.user.examAttempts) {
      const question = attempt.questions.find(q => q.order === qOrder);
      if (question && question.answer) {
        const answer = question.answer;
        const record = questions.find(q => q.answer == answer);
        if (question.correct) {
          record.correct = record.correct + 1;
        } else {
          record.number = record.number + 1;
        }
      }
    }
  }

  return (
    <div className="flex">
      <div className="w-6/12 p-4">
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart data={questions}>
            <XAxis dataKey="answer"/>
            <YAxis/>
            <Tooltip/>
            <Bar stackId="a" dataKey="number" fill="#f87171"/>
            <Bar stackId="a" dataKey="correct" fill="#34d399"/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}