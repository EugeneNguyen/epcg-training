import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box, Button} from '../../_components';


export default function FormEtCourseTemplateQuestionSourceAdd({fixedParams}) {
  const history = useHistory();

  const [name, setname] = useState(null);
  const [courseTemplateId, setcourseTemplateId] = useState(null);

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = (addAnother) => () => {
    const data = {
      name,
      courseTemplateId,
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
      title="Add new etCourseTemplateQuestionSource"
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
