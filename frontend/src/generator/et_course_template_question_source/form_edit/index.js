import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Button} from '../../_components/button';
import {Box} from '../../_components';

          
export default function FormEtCourseTemplateQuestionSourceEdit({fixedParams}) {
  const id = useParams().selectedObjectId;
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

  const [editApi] = useMutation(API.EDIT);

  const handleSubmit = () => {
    const data = {
      name,
      courseTemplateId,
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
    <Box
      title="Edit etCourseTemplateQuestionSource"
      padding
      footer={(
        <Button onClick={handleSubmit}>
          Update
        </Button>
      )}
    >
      <Form onSubmitParams={handleSubmit}>
        {(!fixedParams || !fixedParams.name) && (
          <Input
            type="VARCHAR(255)"
            name="name"
            displayLabel="Name"
            value={name}
            onValueChange={(value) => setname(value)}
          />
        )}
        {(!fixedParams || !fixedParams.courseTemplateId) && (
          <Input
            type="CHAR(36)"
            name="courseTemplateId"
            displayLabel="Course Template Id"
            value={courseTemplateId}
            onValueChange={(value) => setcourseTemplateId(value)}
          />
        )}
      </Form>
    </Box>
  );
}
