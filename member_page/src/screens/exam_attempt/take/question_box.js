import {useMutation} from "@apollo/client";
import API from "../api";
import {Box} from "../../../components";

export default function QuestionBox({question, index}) {
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
        {questionData.questionImage && (
          <img
            className="max-w-lg"
            src={questionData.questionImage}
          />
        )}
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
