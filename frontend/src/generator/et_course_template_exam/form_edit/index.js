import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box} from '../../_components';

export default function FormEtCourseTemplateExamEdit({fixedParams}) {
  const id = useParams().selectedObjectId;
  const history = useHistory();

  const [name, setname] = useState(null);
  const [duration, setduration] = useState(null);
  const [numberOfQuestion, setnumberOfQuestion] = useState(null);
  const [unlimitedTime, setunlimitedTime] = useState(null);
  const [randomQuestionOrder, setrandomQuestionOrder] = useState(null);
  const [randomChoiceOrder, setrandomChoiceOrder] = useState(null);
  const [courseTemplateId, setcourseTemplateId] = useState(null);
  const [questionsRelationship, setquestionsRelationship] = useState([]);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id },
      onCompleted: (response) => {
        setname(response.data.name);
        setduration(response.data.duration);
        setnumberOfQuestion(response.data.numberOfQuestion);
        setunlimitedTime(response.data.unlimitedTime);
        setrandomQuestionOrder(response.data.randomQuestionOrder);
        setrandomChoiceOrder(response.data.randomChoiceOrder);
        setcourseTemplateId(response.data.courseTemplateId);

        setquestionsRelationship(response.data.questions.map(r => r.id));
      },
    }
  );
  const [editApi] = useMutation(API.EDIT, {
    onCompleted: () => {
      toast.success('Edit completed');
      history.goBack();
    }
  });

  const handleSubmit = (params) => {
    editApi({ variables: { id, data: params } });
  }

  return (
    <Box title="Add new etCourseTemplateExam" padding>
      <Form onSubmitParams={handleSubmit}>
        <div class="grid grid-cols-1 gap-2">
        {fixedParams && fixedParams.name ? (
          <Input type="HIDDEN" name="name" value={fixedParams.name} />
        ) : (
          <Input
            type="VARCHAR(255)"
            name="name"
            displayLabel="Name"
            value={name}
            onValueChange={(value) => setname(value)}
          />
        )}
        {fixedParams && fixedParams.duration ? (
          <Input type="HIDDEN" name="duration" value={fixedParams.duration} />
        ) : (
          <Input
            type="INT"
            name="duration"
            displayLabel="Duration"
            value={duration}
            onValueChange={(value) => setduration(value)}
          />
        )}
        {fixedParams && fixedParams.numberOfQuestion ? (
          <Input type="HIDDEN" name="numberOfQuestion" value={fixedParams.numberOfQuestion} />
        ) : (
          <Input
            type="INT"
            name="numberOfQuestion"
            displayLabel="Number Of Question"
            value={numberOfQuestion}
            onValueChange={(value) => setnumberOfQuestion(value)}
          />
        )}
        {fixedParams && fixedParams.unlimitedTime ? (
          <Input type="HIDDEN" name="unlimitedTime" value={fixedParams.unlimitedTime} />
        ) : (
          <Input
            type="TINYINT(1)"
            name="unlimitedTime"
            displayLabel="Unlimited Time"
            value={unlimitedTime}
            onValueChange={(value) => setunlimitedTime(value)}
          />
        )}
        {fixedParams && fixedParams.randomQuestionOrder ? (
          <Input type="HIDDEN" name="randomQuestionOrder" value={fixedParams.randomQuestionOrder} />
        ) : (
          <Input
            type="TINYINT(1)"
            name="randomQuestionOrder"
            displayLabel="Random Question Order"
            value={randomQuestionOrder}
            onValueChange={(value) => setrandomQuestionOrder(value)}
          />
        )}
        {fixedParams && fixedParams.randomChoiceOrder ? (
          <Input type="HIDDEN" name="randomChoiceOrder" value={fixedParams.randomChoiceOrder} />
        ) : (
          <Input
            type="TINYINT(1)"
            name="randomChoiceOrder"
            displayLabel="Random Choice Order"
            value={randomChoiceOrder}
            onValueChange={(value) => setrandomChoiceOrder(value)}
          />
        )}
        {fixedParams && fixedParams.courseTemplateId ? (
          <Input type="HIDDEN" name="courseTemplateId" value={fixedParams.courseTemplateId} />
        ) : (
          <Input
            type="SELECT"
            query={require('../../et_course_template/apis').default.ALL}
            idKey="id"
            labelKey="name"
            name="courseTemplateId"
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
        <div class="flex mt-2">
          <button
            type="submit"
            class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Submit
          </button>
        </div>
      </Form>
    </Box>
  );
}
