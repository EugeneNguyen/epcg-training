import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box} from '../../_components';

export default function FormEtExamAttemptQuestionEdit({fixedParams}) {
  const id = useParams().selectedObjectId;
  const history = useHistory();

  const [attemptId, setattemptId] = useState(null);
  const [questionId, setquestionId] = useState(null);
  const [order, setorder] = useState(null);
  const [questionData, setquestionData] = useState(null);
  const [answer, setanswer] = useState(null);
  const [rawAnswer, setrawAnswer] = useState(null);
  const [correct, setcorrect] = useState(null);
  const [startTime, setstartTime] = useState(null);
  const [endTime, setendTime] = useState(null);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id },
      onCompleted: (response) => {
        setattemptId(response.data.attemptId);
        setquestionId(response.data.questionId);
        setorder(response.data.order);
        setquestionData(response.data.questionData);
        setanswer(response.data.answer);
        setrawAnswer(response.data.rawAnswer);
        setcorrect(response.data.correct);
        setstartTime(response.data.startTime);
        setendTime(response.data.endTime);

      },
    }
  );
  const [editApi] = useMutation(API.EDIT, {
    onCompleted: () => {
      toast.success('Edit completed');
      history.goBack();
    }
  });

  const handleSubmit = (params) => {
    editApi({ variables: { id, data: params } });
  }

  return (
    <Box title="Add new etExamAttemptQuestion" padding>
      <Form onSubmitParams={handleSubmit}>
        <div class="grid grid-cols-1 gap-2">
        {fixedParams && fixedParams.attemptId ? (
          <Input type="HIDDEN" name="attemptId" value={fixedParams.attemptId} />
        ) : (
          <Input
            type="CHAR(36)"
            name="attemptId"
            displayLabel="Attempt Id"
            value={attemptId}
            onValueChange={(value) => setattemptId(value)}
          />
        )}
        {fixedParams && fixedParams.questionId ? (
          <Input type="HIDDEN" name="questionId" value={fixedParams.questionId} />
        ) : (
          <Input
            type="CHAR(36)"
            name="questionId"
            displayLabel="Question Id"
            value={questionId}
            onValueChange={(value) => setquestionId(value)}
          />
        )}
        {fixedParams && fixedParams.order ? (
          <Input type="HIDDEN" name="order" value={fixedParams.order} />
        ) : (
          <Input
            type="INT"
            name="order"
            displayLabel="Order"
            value={order}
            onValueChange={(value) => setorder(value)}
          />
        )}
        {fixedParams && fixedParams.questionData ? (
          <Input type="HIDDEN" name="questionData" value={fixedParams.questionData} />
        ) : (
          <Input
            type="TEXT"
            name="questionData"
            displayLabel="Question Data"
            value={questionData}
            onValueChange={(value) => setquestionData(value)}
          />
        )}
        {fixedParams && fixedParams.answer ? (
          <Input type="HIDDEN" name="answer" value={fixedParams.answer} />
        ) : (
          <Input
            type="VARCHAR(255)"
            name="answer"
            displayLabel="Answer"
            value={answer}
            onValueChange={(value) => setanswer(value)}
          />
        )}
        {fixedParams && fixedParams.rawAnswer ? (
          <Input type="HIDDEN" name="rawAnswer" value={fixedParams.rawAnswer} />
        ) : (
          <Input
            type="VARCHAR(255)"
            name="rawAnswer"
            displayLabel="Raw Answer"
            value={rawAnswer}
            onValueChange={(value) => setrawAnswer(value)}
          />
        )}
        {fixedParams && fixedParams.correct ? (
          <Input type="HIDDEN" name="correct" value={fixedParams.correct} />
        ) : (
          <Input
            type="TINYINT(1)"
            name="correct"
            displayLabel="Correct"
            value={correct}
            onValueChange={(value) => setcorrect(value)}
          />
        )}
        {fixedParams && fixedParams.startTime ? (
          <Input type="HIDDEN" name="startTime" value={fixedParams.startTime} />
        ) : (
          <Input
            type="DATETIME"
            name="startTime"
            displayLabel="Start Time"
            value={startTime}
            onValueChange={(value) => setstartTime(value)}
          />
        )}
        {fixedParams && fixedParams.endTime ? (
          <Input type="HIDDEN" name="endTime" value={fixedParams.endTime} />
        ) : (
          <Input
            type="DATETIME"
            name="endTime"
            displayLabel="End Time"
            value={endTime}
            onValueChange={(value) => setendTime(value)}
          />
        )}
        </div>
        <div class="flex mt-2">
          <button
            type="submit"
            class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Submit
          </button>
        </div>
      </Form>
    </Box>
  );
}
