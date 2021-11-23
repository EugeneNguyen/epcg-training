import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box, Button} from '../../_components';


export default function FormEtCourseAdd({fixedParams}) {
  const history = useHistory();

  const [name, setname] = useState(null);
  const [educationProviderId, seteducationProviderId] = useState(null);
  const [courseTemplateId, setcourseTemplateId] = useState(null);
  const [isPrivateCourse, setisPrivateCourse] = useState(null);

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = (addAnother) => () => {
    const data = {
      name,
      educationProviderId,
      courseTemplateId,
      isPrivateCourse,
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
      title="Add new etCourse"
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
        {(!fixedParams || !fixedParams.educationProviderId) && (
          <Input
            type="SELECT"
            query={require('../../et_education_provider/apis').default.ALL}
            idKey="id"
            labelKey="name"
            displayLabel="Education Provider"
            value={educationProviderId}
            onValueChange={(value) => seteducationProviderId(value)}
          />
        )}
        {(!fixedParams || !fixedParams.courseTemplateId) && (
          <Input
            type="SELECT"
            query={require('../../et_course_template/apis').default.ALL}
            idKey="id"
            labelKey="name"
            displayLabel="Course Template"
            value={courseTemplateId}
            onValueChange={(value) => setcourseTemplateId(value)}
            variables={{educationProviderId: fixedParams.educationProviderId || educationProviderId}}
          />
        )}
        {(!fixedParams || !fixedParams.isPrivateCourse) && (
          <Input
            type="TINYINT(1)"
            name="isPrivateCourse"
            displayLabel="Is Private Course"
            value={isPrivateCourse}
            onValueChange={(value) => setisPrivateCourse(value)}
          />
        )}
      </Form>
    </Box>
  );
}
