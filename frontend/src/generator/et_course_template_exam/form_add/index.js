import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Button} from '../../_components/button';
import {Box} from '../../_components';


export default function FormEtCourseTemplateExamAdd({fixedParams}) {
  const history = useHistory();

  const [name, setname] = useState(null);
  const [duration, setduration] = useState(null);
  const [numberOfQuestion, setnumberOfQuestion] = useState(null);
  const [unlimitedTime, setunlimitedTime] = useState(null);
  const [randomQuestionOrder, setrandomQuestionOrder] = useState(null);
  const [randomChoiceOrder, setrandomChoiceOrder] = useState(null);
  const [isPublic, setisPublic] = useState(null);
  const [courseTemplateId, setcourseTemplateId] = useState(null);
  const [questionsRelationship, setquestionsRelationship] = useState([]);

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = (addAnother) => () => {
    console.log(addAnother);
    const data = {
      name,
      duration,
      numberOfQuestion,
      unlimitedTime,
      randomQuestionOrder,
      randomChoiceOrder,
      isPublic,
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
  }

  return (
    <Box title="Add new etCourseTemplateExam" padding>
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
        {(!fixedParams || !fixedParams.duration) && (
          <Input
            type="INT"
            name="duration"
            displayLabel="Duration"
            value={duration}
            onValueChange={(value) => setduration(value)}
          />
        )}
        {(!fixedParams || !fixedParams.numberOfQuestion) && (
          <Input
            type="INT"
            name="numberOfQuestion"
            displayLabel="Number Of Question"
            value={numberOfQuestion}
            onValueChange={(value) => setnumberOfQuestion(value)}
          />
        )}
        {(!fixedParams || !fixedParams.unlimitedTime) && (
          <Input
            type="TINYINT(1)"
            name="unlimitedTime"
            displayLabel="Unlimited Time"
            value={unlimitedTime}
            onValueChange={(value) => setunlimitedTime(value)}
          />
        )}
        {(!fixedParams || !fixedParams.randomQuestionOrder) && (
          <Input
            type="TINYINT(1)"
            name="randomQuestionOrder"
            displayLabel="Random Question Order"
            value={randomQuestionOrder}
            onValueChange={(value) => setrandomQuestionOrder(value)}
          />
        )}
        {(!fixedParams || !fixedParams.randomChoiceOrder) && (
          <Input
            type="TINYINT(1)"
            name="randomChoiceOrder"
            displayLabel="Random Choice Order"
            value={randomChoiceOrder}
            onValueChange={(value) => setrandomChoiceOrder(value)}
          />
        )}
        {(!fixedParams || !fixedParams.isPublic) && (
          <Input
            type="TINYINT(1)"
            name="isPublic"
            displayLabel="Is Public"
            value={isPublic}
            onValueChange={(value) => setisPublic(value)}
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
