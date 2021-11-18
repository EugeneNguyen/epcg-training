import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Button} from '../../_components/button';
import {Box} from '../../_components';


export default function FormEtCourseTemplateQuestionTagAdd({fixedParams}) {
  const history = useHistory();

  const [name, setname] = useState(null);
  const [courseTemplateId, setcourseTemplateId] = useState(null);
  const [questionsRelationship, setquestionsRelationship] = useState([]);

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = (addAnother) => () => {
    const data = {
      name,
      courseTemplateId,
      questions: questionsRelationship,
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
    <Box title="Add new etCourseTemplateQuestionTag" padding>
      <Form onSubmitParams={handleSubmit(false)}>
        <div class="grid grid-cols-1 gap-2">
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
