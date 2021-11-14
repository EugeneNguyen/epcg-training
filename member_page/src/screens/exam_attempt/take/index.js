import {useParams} from "react-router-dom";
import API from "../api";
import {useQuery} from "@apollo/client";
import _ from "lodash";
import QuestionBox from "./question_box";
import QuestionListBox from "./question_list_box";

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

  if (!questions) {
    return "Loading ...";
  }

  return (
    <div className="flex flex-row space-x-8">
      <div className="space-y-8 w-8/12">
        {questions.map((question, index) => (
          <QuestionBox question={question} index={index}/>
        ))}
      </div>
      <div className="w-4/12">
        <QuestionListBox questions={questions} attemptId={id}/>
      </div>
    </div>
  );
}
