import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Button} from '../../_components/button';
import {Box} from '../../_components';

            
export default function FormEtCourseExamEdit({fixedParams}) {
  const id = useParams().selectedObjectId;
  const history = useHistory();

  const [name, setname] = useState(null);
  const [courseId, setcourseId] = useState(null);
  const [courseTemplateExamId, setcourseTemplateExamId] = useState(null);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id },
      onCompleted: (response) => {
        setname(response.data.name);
        setcourseId(response.data.courseId);
        setcourseTemplateExamId(response.data.courseTemplateExamId);

      },
    }
  );

  const [editApi] = useMutation(API.EDIT);

  const handleSubmit = () => {
    const data = {
      name,
      courseId,
      courseTemplateExamId,
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
      title="Edit etCourseExam"
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
        {(!fixedParams || !fixedParams.courseId) && (
          <Input
            type="SELECT"
            query={require('../../et_course/apis').default.ALL}
            idKey="id"
            labelKey="name"
            name="courseId"
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
            name="courseTemplateExamId"
            displayLabel="Course Template Exam"
            value={courseTemplateExamId}
            onValueChange={(value) => setcourseTemplateExamId(value)}
          />
        )}
      </Form>
    </Box>
  );
}
