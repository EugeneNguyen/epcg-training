import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Button} from '../../_components/button';
import {Box} from '../../_components';


export default function FormEtCourseTemplateQuestionTagLinkAdd({fixedParams}) {
  const history = useHistory();

  const [questionId, setquestionId] = useState(null);
  const [questionTagId, setquestionTagId] = useState(null);

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = (addAnother) => () => {
    console.log(addAnother);
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
  }

  return (
    <Box title="Add new etCourseTemplateQuestionTagLink" padding>
      <Form onSubmitParams={handleSubmit(false)}>
        <div class="grid grid-cols-1 gap-2">
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
