import {useParams} from "react-router-dom";
import API from "../api";
import {useMutation, useQuery} from "@apollo/client";
import {Box} from "../../../components";
import _ from "lodash";
import {useState} from "react";
import {Button} from "../../../generator/_components";
import classNames from "classnames";

export default function ScreenExamAttemptResult() {
  const id = useParams().id;
  const [qIndex, setQIndex] = useState(0);

  const {data} = useQuery(
    API.GET_RESULT,
    {
      ...API.DEFAULT_OPTIONS,
      variables: {
        id,
      },
    },
  );

  if (!data) return null;

  const questions = _.orderBy(
    _.get(data, 'data.questions', []).map(item => {
      item.order = parseInt(item.order);
      return item;
    }),
    ['order']
  );

  const total = questions.length;
  const correct = questions.filter(q => q.correct).length;

  return questions ? (
    <div className="flex flex-row space-x-8">
      <div className="space-y-8 w-8/12">
        <QuestionBox
          question={questions[qIndex]}
          index={qIndex}
        />
        <div className="space-x-2">
          {qIndex > 0 && <Button onClick={() => setQIndex(qIndex - 1)}>Back</Button>}
          {qIndex < questions.length - 1 && <Button onClick={() => setQIndex(qIndex + 1)}>Next</Button>}
        </div>
      </div>
      <div className="w-4/12">
        <Box title={`Result: ${parseInt(correct * 100 / total)}% (${correct}/${total})`}>
          <div className="grid grid-cols-5">
            {questions.map((question, index) => (
              <div
                onClick={() => setQIndex(index)}
                className={classNames(
                  'border p-4 text-center hover:bg-gray-200 cursor-pointer',
                  {'bg-green-50': question.correct},
                  {'bg-red-50': !question.correct},
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

function QuestionBox({question, index}) {
  const questionData = JSON.parse(question.fullQuestionData);

  return (
    <Box title={`Question ${index + 1} ${question.correct ? "[Correct]" : "[Incorrect]"}`} padding>
      <div className="space-y-4">
        <div>
          {questionData.question}
        </div>
        <div className="flex flex-col space-y-2">
          {questionData.choices.map((choice, choiceIndex) => (
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name={`question_${index}`}
                checked={['A', 'B', 'C', 'D'][choiceIndex] == question.rawAnswer}
                disabled
              />
              <span className="ml-2">
                {['A', 'B', 'C', 'D'][choiceIndex] == questionData.correctAnswer ? (
                  "[Correct Answer] "
                ) : null}
                {choice}
              </span>
            </label>
          ))}
        </div>
        <div>
          <p>Correct Answer: {questionData.correctAnswer}</p>
          <p>Explanation: {questionData.explanation}</p>
        </div>
      </div>
    </Box>
  );
}