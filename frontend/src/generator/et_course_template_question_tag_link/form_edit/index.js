import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Button} from '../../_components/button';
import {Box} from '../../_components';

          
export default function FormEtCourseTemplateQuestionTagLinkEdit({fixedParams}) {
  const id = useParams().selectedObjectId;
  const history = useHistory();

  const [questionId, setquestionId] = useState(null);
  const [questionTagId, setquestionTagId] = useState(null);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id },
      onCompleted: (response) => {
        setquestionId(response.data.questionId);
        setquestionTagId(response.data.questionTagId);

      },
    }
  );

  const [editApi] = useMutation(API.EDIT);

  const handleSubmit = () => {
    const data = {
      questionId,
      questionTagId,
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
    <Box title="Edit etCourseTemplateQuestionTagLink" padding>
      <Form onSubmitParams={handleSubmit}>
        <div class="grid grid-cols-1 gap-2">
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
        {(!fixedParams || !fixedParams.questionTagId) && (
          <Input
            type="SELECT"
            query={require('../../et_course_template_question_tag/apis').default.ALL}
            idKey="id"
            labelKey="name"
            name="questionTagId"
            displayLabel="Tag"
            value={questionTagId}
            onValueChange={(value) => setquestionTagId(value)}
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
