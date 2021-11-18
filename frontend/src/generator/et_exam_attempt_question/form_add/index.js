import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Button} from '../../_components/button';
import {Box} from '../../_components';


export default function FormEtExamAttemptQuestionAdd({fixedParams}) {
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

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = (addAnother) => () => {
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
    apiAdd({variables: {data}})
      .then(() => {
        toast.success('Add completed');
        if (!addAnother) {
          history.goBack();
        }
      })
      .catch(error => toast.error(error.message));
  }

  return (
    <Box title="Add new etExamAttemptQuestion" padding>
      <Form onSubmitParams={handleSubmit(false)}>
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
        <input type="submit" class="invisible" />
      </Form>
      <div class="flex space-x-2">
        <Button onClick={handleSubmit(false)}>
          Submit
        </Button>
      </div>
    </Box>
  );
}
