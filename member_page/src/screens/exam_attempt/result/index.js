import {useParams} from "react-router-dom";
import API from "../api";
import {Box} from "../../../components";
import orderBy from "lodash/orderBy";
import get from "lodash/get";
import {useState} from "react";
import classNames from "classnames";
import QuestionBox from "./question_box";
import {useQuery} from "../../../generator/_components";
import AnalyticBox from "./analytic";

export default function ScreenExamAttemptResult() {
  const {id} = useParams();
  const [qIndex, setQIndex] = useState(0);

  const {data, loading, error} = useQuery(API.GET_RESULT, {variables: {id}});

  if (loading && !data) return "Loading ...";
  if (error) return "Error ...";
  if (!data) return "No Data ...";

  const questions = orderBy(get(data, 'data.questions', []), ['order']);
  const total = questions.length;
  const correct = questions.filter(q => q.correct).length;

  return questions ? (
    <div className="flex flex-row space-x-8">
      <div className="space-y-8 w-8/12">
        <QuestionBox
          question={questions[qIndex]}
          index={qIndex}
        />
        <AnalyticBox
          question={questions[qIndex]}
        />
      </div>
      <div className="w-4/12">
        <Box title={`Result: ${parseInt(correct * 100 / total)}% (${correct}/${total})`}>
          <div className="grid grid-cols-5">
            {questions.map((question, index) => (
              <div
                onClick={() => setQIndex(index)}
                className={classNames(
                  'border p-4 text-center hover:bg-gray-200 cursor-pointer',
                  {'bg-green-100': question.correct},
                  {'bg-red-100': !question.correct},
                )}>
                {index + 1}
              </div>
            ))}
          </div>
        </Box>
      </div>
    </div>
  ) : null;
}
