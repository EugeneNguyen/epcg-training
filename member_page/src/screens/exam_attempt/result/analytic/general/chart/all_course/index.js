import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useQuery} from "../../../../../../../generator/_components";
import API from "./api";

export default function AllCourseChart({question}) {
  const {data, error, loading} = useQuery(API.GET_ATTEMPT_QUESTION_BY_QUESTION_ID, {
    variables: {questionId: question.questionId}
  });

  if (loading) return "Loading";
  if (error) return "Error";

  const questions = [
    {answer: 'A', number: 0, correct: 0},
    {answer: 'B', number: 0, correct: 0},
    {answer: 'C', number: 0, correct: 0},
    {answer: 'D', number: 0, correct: 0},
  ];

  for (const _question of data.data) {
    if (_question && _question.answer) {
      const record = questions.find(q => q.answer === _question.answer);
      if (_question.correct) {
        record.correct = record.correct + 1;
      } else {
        record.number = record.number + 1;
      }
    }
  }

  return (
    <div>
      <ResponsiveContainer width="100%" aspect={2}>
        <BarChart data={questions}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="answer"/>
          <YAxis/>
          <Tooltip/>
          <Bar stackId="a" dataKey="number" fill="#f87171"/>
          <Bar stackId="a" dataKey="correct" fill="#34d399"/>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-center">All classes</p>
    </div>
  )
}