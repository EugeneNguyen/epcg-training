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
  const [displayedQuestionData, setdisplayedQuestionData] = useState(null);
  const [fullQuestionData, setfullQuestionData] = useState(null);
  const [answer, setanswer] = useState(null);
  const [rawAnswer, setrawAnswer] = useState(null);
  const [correct, setcorrect] = useState(null);
  const [flag, setflag] = useState(null);
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
        setdisplayedQuestionData(response.data.displayedQuestionData);
        setfullQuestionData(response.data.fullQuestionData);
        setanswer(response.data.answer);
        setrawAnswer(response.data.rawAnswer);
        setcorrect(response.data.correct);
        setflag(response.data.flag);
        setstartTime(response.data.startTime);
        setendTime(response.data.endTime);

      },
    }
  );

  const [editApi] = useMutation(API.EDIT);

  const handleSubmit = (params) => {
    const data = {
      attemptId,
      questionId,
      order,
      displayedQuestionData,
      fullQuestionData,
      answer,
      rawAnswer,
      correct,
      flag,
      startTime,
      endTime,
      ...fixedParams,
    };
    editApi({ variables: { id, data } })
      .then(() => {
        toast.success('Edit completed');
        history.goBack();
      })
  }

  return (
    <Box title="Add new etExamAttemptQuestion" padding>
      <Form onSubmitParams={handleSubmit}>
        <div class="grid grid-cols-1 gap-2">
        {(!fixedParams || !fixedParams.attemptId) && (
          <Input
            type="CHAR(36)"
            name="attemptId"
            displayLabel="Attempt Id"
            value={attemptId}
            onValueChange={(value) => setattemptId(value)}
          />
        )}
        {(!fixedParams || !fixedParams.questionId) && (
          <Input
            type="CHAR(36)"
            name="questionId"
            displayLabel="Question Id"
            value={questionId}
            onValueChange={(value) => setquestionId(value)}
          />
        )}
        {(!fixedParams || !fixedParams.order) && (
          <Input
            type="INT"
            name="order"
            displayLabel="Order"
            value={order}
            onValueChange={(value) => setorder(value)}
          />
        )}
        {(!fixedParams || !fixedParams.displayedQuestionData) && (
          <Input
            type="TEXT"
            name="displayedQuestionData"
            displayLabel="Displayed Question Data"
            value={displayedQuestionData}
            onValueChange={(value) => setdisplayedQuestionData(value)}
          />
        )}
        {(!fixedParams || !fixedParams.fullQuestionData) && (
          <Input
            type="TEXT"
            name="fullQuestionData"
            displayLabel="Full Question Data"
            value={fullQuestionData}
            onValueChange={(value) => setfullQuestionData(value)}
          />
        )}
        {(!fixedParams || !fixedParams.answer) && (
          <Input
            type="VARCHAR(255)"
            name="answer"
            displayLabel="Answer"
            value={answer}
            onValueChange={(value) => setanswer(value)}
          />
        )}
        {(!fixedParams || !fixedParams.rawAnswer) && (
          <Input
            type="VARCHAR(255)"
            name="rawAnswer"
            displayLabel="Raw Answer"
            value={rawAnswer}
            onValueChange={(value) => setrawAnswer(value)}
          />
        )}
        {(!fixedParams || !fixedParams.correct) && (
          <Input
            type="TINYINT(1)"
            name="correct"
            displayLabel="Correct"
            value={correct}
            onValueChange={(value) => setcorrect(value)}
          />
        )}
        {(!fixedParams || !fixedParams.flag) && (
          <Input
            type="TINYINT(1)"
            name="flag"
            displayLabel="Flag"
            value={flag}
            onValueChange={(value) => setflag(value)}
          />
        )}
        {(!fixedParams || !fixedParams.startTime) && (
          <Input
            type="DATETIME"
            name="startTime"
            displayLabel="Start Time"
            value={startTime}
            onValueChange={(value) => setstartTime(value)}
          />
        )}
        {(!fixedParams || !fixedParams.endTime) && (
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
