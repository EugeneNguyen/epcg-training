import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box} from '../../_components';

export default function FormEtCourseTemplateQuestionSourceEdit() {
  const { id } = useParams();
  const history = useHistory();

  const [name, setname] = useState(null);
  const [courseTemplateId, setcourseTemplateId] = useState(null);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id },
      onCompleted: (response) => {
        setname(response.data.name);
        setcourseTemplateId(response.data.courseTemplateId);
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
    <Box title="Add new etCourseTemplateQuestionSource" padding>
      <Form onSubmitParams={(params) => edit({ variables: { id, data: params } })}>
        <div class="grid grid-cols-1 gap-2">
        <Input
          type="VARCHAR(255)"
          name="name"
          displayLabel="Name"
          value={name}
          onValueChange={(value) => setname(value)}
        />
        <Input
          type="CHAR(36)"
          name="courseTemplateId"
          displayLabel="Course Template Id"
          value={courseTemplateId}
          onValueChange={(value) => setcourseTemplateId(value)}
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
