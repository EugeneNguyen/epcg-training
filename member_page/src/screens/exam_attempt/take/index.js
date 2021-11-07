import {useParams} from "react-router-dom";
import API from "../api";
import {useMutation, useQuery} from "@apollo/client";
import {Box} from "../../../components";
import _ from "lodash";

export default function ScreenExamAttemptTake() {
  const id = useParams().id;

  const {data} = useQuery(
    API.GET_BY_ID_WITH_QUESTION,
    {
      ...API.DEFAULT_OPTIONS,
      variables: {
        id,
      },
    },
  );

  const questions = _.orderBy(
    _.get(data, 'data.questions', []).map(item => {
      item.order = parseInt(item.order);
      return item;
    }),
    ['order']
  );

  return questions ? (
    <div className="flex flex-row space-x-8">
      <div className="space-y-8 w-8/12">
        {questions.map((question, index) => (
          <QuestionBox
            question={question}
            index={index}
          />
        ))}
      </div>
      <div className="w-4/12">
        <Box title="Question List">
          <div className="grid grid-cols-5">
            {questions.map((question, index) => (
              <div className="bg-gray-50 border p-4 text-center hover:bg-gray-200 cursor-pointer">
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
  const questionData = JSON.parse(question.displayedQuestionData);
  const [answerApi, { loading }] = useMutation(API.ANSWER_WITH_ID);

  const handleAnswer = async (choiceIndex) => {
    const answer = ['A', 'B', 'C', 'D'][choiceIndex];
    await answerApi({variables: {id: question.id, rawAnswer: answer}});
  }
  return (
    <Box title={`Question ${index + 1}`} padding>
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
                onChange={() => handleAnswer(choiceIndex)}
                disabled={loading}
              />
              <span className="ml-2">{choice}</span>
            </label>
          ))}
        </div>
      </div>
    </Box>
  );
}