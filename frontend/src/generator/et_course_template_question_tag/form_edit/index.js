import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Button} from '../../_components/button';
import {Box} from '../../_components';

          
export default function FormEtCourseTemplateQuestionTagEdit({fixedParams}) {
  const id = useParams().selectedObjectId;
  const history = useHistory();

  const [name, setname] = useState(null);
  const [courseTemplateId, setcourseTemplateId] = useState(null);
  const [questionsRelationship, setquestionsRelationship] = useState([]);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id },
      onCompleted: (response) => {
        setname(response.data.name);
        setcourseTemplateId(response.data.courseTemplateId);

        setquestionsRelationship(response.data.questions.map(r => r.id));
      },
    }
  );

  const [editApi] = useMutation(API.EDIT);

  const handleSubmit = () => {
    const data = {
      name,
      courseTemplateId,
      questions: questionsRelationship,
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
      title="Edit etCourseTemplateQuestionTag"
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
            type="SELECT"
            query={require('../../et_course_template/apis').default.ALL}
            idKey="id"
            labelKey="name"
            name="courseTemplateId"
            displayLabel="Courese Template"
            value={courseTemplateId}
            onValueChange={(value) => setcourseTemplateId(value)}
          />
        )}
        <Input
          type="SELECT"
          query={require('../../et_course_template_question_mcq/apis').default.ALL}
          idKey="id"
          labelKey="questionCode"
          name="questions"
          displayLabel="Questions"
          value={questionsRelationship}
          onValueChange={(value) => setquestionsRelationship(value)}
          isMulti
        />
      </Form>
    </Box>
  );
}
