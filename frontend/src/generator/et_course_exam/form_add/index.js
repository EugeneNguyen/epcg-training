import {useMutation, useQuery} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box, Button} from '../../_components';


export default function FormEtCourseExamAdd({fixedParams, parent={}}) {
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

  const [name, setname] = useState(null);
  const [courseId, setcourseId] = useState(null);
  const [courseTemplateExamId, setcourseTemplateExamId] = useState(null);

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = (addAnother) => () => {
    const data = {
      name,
      courseId,
      courseTemplateExamId,
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
      title="Add new etCourseExam"
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
        {(!fixedParams || !fixedParams.courseId) && (
          <Input
            type="SELECT"
            query={require('../../et_course/apis').default.ALL}
            idKey="id"
            labelKey="name"
            displayLabel="Course"
            value={courseId}
            onValueChange={(value) => setcourseId(value)}
          />
        )}
        {(!fixedParams || !fixedParams.courseTemplateExamId) && (
          <Input
            type="SELECT"
            query={require('../../et_course_template_exam/apis').default.ALL}
            idKey="id"
            labelKey="name"
            displayLabel="Course Template Exam"
            value={courseTemplateExamId}
            onValueChange={(value) => setcourseTemplateExamId(value)}
            variables={{courseTemplateId: parent.courseTemplateId}}
          />
        )}
      </Form>
    </Box>
  );
}
