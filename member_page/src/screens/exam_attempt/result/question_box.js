import {Box} from "../../../components";
import {Tag} from "../../../generator/_components";

export default function QuestionBox({question, index}) {
  const questionData = JSON.parse(question.fullQuestionData);

  return (
    <Box
      title={`Question ${index + 1}`}
      subtitle={question.correct ? (
          <Tag color="success">Correct</Tag>
        ) : (
          <Tag color="error">Incorrect</Tag>
        )}
      padding
    >
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
                {choice}
                {['A', 'B', 'C', 'D'][choiceIndex] == questionData.correctAnswer ? (
                  <Tag color="success">Correct Answer</Tag>
                ) : null}
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