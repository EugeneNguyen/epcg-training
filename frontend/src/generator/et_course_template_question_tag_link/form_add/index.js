import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box, Button} from '../../_components';


export default function FormEtCourseTemplateQuestionTagLinkAdd({fixedParams}) {
  const history = useHistory();

  const [questionId, setquestionId] = useState(null);
  const [questionTagId, setquestionTagId] = useState(null);

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = (addAnother) => () => {
    const data = {
      questionId,
      questionTagId,
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
      title="Add new etCourseTemplateQuestionTagLink"
      padding
      footer={(
        <div class="flex space-x-2">
          <Button onClick={handleSubmit(false)}>
            Submit
          </Button>
        </div>
      )}
    >
      <Form onSubmitParams={handleSubmit(false)}>
        {(!fixedParams || !fixedParams.questionId) && (
          <Input
            type="SELECT"
            query={require('../../et_course_template_question_mcq/apis').default.ALL}
            idKey="id"
            labelKey="questionCode"
            displayLabel="Question"
            value={questionId}
            onValueChange={(value) => setquestionId(value)}
          />
        )}
        {(!fixedParams || !fixedParams.questionTagId) && (
          <Input
            type="SELECT"
            query={require('../../et_course_template_question_tag/apis').default.ALL}
            idKey="id"
            labelKey="name"
            displayLabel="Tag"
            value={questionTagId}
            onValueChange={(value) => setquestionTagId(value)}
          />
        )}
      </Form>
    </Box>
  );
}
