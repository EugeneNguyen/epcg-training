import {useMutation, useQuery} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box, Button} from '../../_components';


export default function FormEtCourseTemplateExamQuestionAdd({fixedParams, parent={}}) {
  if (parent.query) {
    return <FormAddWithParent fixedParams={fixedParams} parent={parent}/>
  }
  return <FormAdd fixedParams={fixedParams}/>
}

function FormAddWithParent({fixedParams, parent}) {
  const {data, error, loading} = useQuery(parent.query, {variables: parent.variables});
  if (loading) return null;
  if (error) return null;
  return (
    <FormAdd fixedParams={fixedParams} parent={data.data}/>
  );
}

function FormAdd({fixedParams, parent={}}) {
  const history = useHistory();

  const [examId, setexamId] = useState(null);
  const [questionId, setquestionId] = useState(null);
  const [order, setorder] = useState(null);

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = (addAnother) => () => {
    const data = {
      examId,
      questionId,
      order,
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
    <Box
      title="Add new etCourseTemplateExamQuestion"
      padding
      footer={(
        <div class="flex space-x-2">
          <Button onClick={handleSubmit(false)}>
            Submit
          </Button>
          <Button onClick={handleSubmit(true)}>
            Save and add another
          </Button>
        </div>
      )}
    >
      <Form onSubmitParams={handleSubmit(false)}>
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
            displayLabel="Question"
            value={questionId}
            onValueChange={(value) => setquestionId(value)}
            variables={{courseTemplateId: parent.courseTemplateId}}
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
      </Form>
    </Box>
  );
}
