import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box} from '../../_components';

export default function FormEtCourseTemplateQuestionTagLinkEdit() {
  const { id } = useParams();
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
  const [edit] = useMutation(API.EDIT, {
    onCompleted: () => {
      toast.success('Edit completed');
      history.goBack();
    }
  });

  return (
    <Box title="Add new etCourseTemplateQuestionTagLink" padding>
      <Form onSubmitParams={(params) => edit({ variables: { id, data: params } })}>
        <div class="grid grid-cols-1 gap-2">
        <Input
          type="SELECT"
          query={require('../../et_course_template_question_mcq/apis').default.ALL}
          idKey="id"
          labelKey="questionCode"
          name="questionId"
          displayLabel="Question Id"
          value={questionId}
          onValueChange={(value) => setquestionId(value)}
        />
        <Input
          type="SELECT"
          query={require('../../et_course_template_question_tag/apis').default.ALL}
          idKey="id"
          labelKey="name"
          name="questionTagId"
          displayLabel="Question Tag Id"
          value={questionTagId}
          onValueChange={(value) => setquestionTagId(value)}
        />
        </div>
        <div class="flex mt-2">
          <button
            type="submit"
            class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Save
          </button>
        </div>
      </Form>
    </Box>
  );
}
