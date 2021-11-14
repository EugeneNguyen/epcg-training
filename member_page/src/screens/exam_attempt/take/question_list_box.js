import {Box} from "../../../components";
import {ButtonLink} from "../../../generator/_components/button";

export default function QuestionListBox({questions, attemptId}) {
  return (
    <Box title="Question List" footer={<ButtonLink to={`/exam/attempt/${attemptId}/result`}>Submit</ButtonLink>}>
      <div className="grid grid-cols-5">
        {questions.map((question, index) => (
          <div className="bg-gray-50 border p-4 text-center hover:bg-gray-200 cursor-pointer">
            {index + 1}
          </div>
        ))}
      </div>
    </Box>
  );
}
