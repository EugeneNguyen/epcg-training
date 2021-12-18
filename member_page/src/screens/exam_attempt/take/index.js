import {useParams} from "react-router-dom";
import API from "../api";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import QuestionBox from "./question_box";
import QuestionListBox from "./question_list_box";
import {useState} from "react";
import {Button} from "../../../generator/_components/button";
import {useQuery} from "../../../generator/_components";

export default function ScreenExamAttemptTake() {
  const id = useParams().id;
  const [qIndex, setQIndex] = useState(0);

  const {data, loading, error} = useQuery(API.GET_BY_ID_WITH_QUESTION, {variables: {id}});

  if (loading && !data) return "Loading ...";
  if (error) return "Error ...";
  if (!data) return "No Data ...";

  const questions = orderBy(get(data, 'data.questions', []), ['order']);

  return (
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
        <QuestionListBox
          questions={questions}
          attemptId={id}
          setIndex={(index) => setQIndex(index)}
          data={data}
        />
      </div>
    </div>
  );
}
