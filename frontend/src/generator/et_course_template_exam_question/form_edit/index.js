import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Button} from '../../_components/button';
import {Box} from '../../_components';

            
export default function FormEtCourseTemplateExamQuestionEdit({fixedParams}) {
  const id = useParams().selectedObjectId;
  const history = useHistory();

  const [examId, setexamId] = useState(null);
  const [questionId, setquestionId] = useState(null);
  const [order, setorder] = useState(null);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id },
      onCompleted: (response) => {
        setexamId(response.data.examId);
        setquestionId(response.data.questionId);
        setorder(response.data.order);

      },
    }
  );

  const [editApi] = useMutation(API.EDIT);

  const handleSubmit = () => {
    const data = {
      examId,
      questionId,
      order,
      ...fixedParams,
    };
    editApi({ variables: { id, data } })
      .then(() => {
        toast.success('Edit completed');
        history.goBack();
      })
      .catch(error => toast.error(error.message));
  }

  return (
    <Box title="Edit etCourseTemplateExamQuestion" padding>
      <Form onSubmitParams={handleSubmit}>
        <div class="grid grid-cols-1 gap-2">
        {(!fixedParams || !fixedParams.examId) && (
          <Input
            type="CHAR(36)"
            name="examId"
            displayLabel="Exam Id"
            value={examId}
            onValueChange={(value) => setexamId(value)}
          />
        )}
        {(!fixedParams || !fixedParams.questionId) && (
          <Input
            type="SELECT"
            query={require('../../et_course_template_question_mcq/apis').default.ALL}
            idKey="id"
            labelKey="questionCode"
            name="questionId"
            displayLabel="Question"
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
        </div>
        <input type="submit" class="invisible" />
      </Form>
      <div class="flex space-x-2">
        <Button onClick={handleSubmit}>
          Update
        </Button>
      </div>
    </Box>
  );
}
