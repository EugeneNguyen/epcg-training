import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box} from '../../_components';

export default function FormEtCourseTemplateQuestionMcqEdit() {
  const { id } = useParams();
  const history = useHistory();

  const [questionCode, setquestionCode] = useState(null);
  const [question, setquestion] = useState(null);
  const [answerA, setanswerA] = useState(null);
  const [answerB, setanswerB] = useState(null);
  const [answerC, setanswerC] = useState(null);
  const [answerD, setanswerD] = useState(null);
  const [correctAnswer, setcorrectAnswer] = useState(null);
  const [explanation, setexplanation] = useState(null);
  const [courseTemplateId, setcourseTemplateId] = useState(null);
  const [questionSourceId, setquestionSourceId] = useState(null);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id },
      onCompleted: (response) => {
        setquestionCode(response.data.questionCode);
        setquestion(response.data.question);
        setanswerA(response.data.answerA);
        setanswerB(response.data.answerB);
        setanswerC(response.data.answerC);
        setanswerD(response.data.answerD);
        setcorrectAnswer(response.data.correctAnswer);
        setexplanation(response.data.explanation);
        setcourseTemplateId(response.data.courseTemplateId);
        setquestionSourceId(response.data.questionSourceId);
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
    <Box title="Add new etCourseTemplateQuestionMCQ" padding>
      <Form onSubmitParams={(params) => edit({ variables: { id, data: params } })}>
        <div class="grid grid-cols-1 gap-2">
        <Input
          type="VARCHAR(255)"
          name="questionCode"
          displayLabel="Question Code"
          value={questionCode}
          onValueChange={(value) => setquestionCode(value)}
        />
        <Input
          type="TEXT"
          name="question"
          displayLabel="Question"
          value={question}
          onValueChange={(value) => setquestion(value)}
        />
        <Input
          type="TEXT"
          name="answerA"
          displayLabel="Answer A"
          value={answerA}
          onValueChange={(value) => setanswerA(value)}
        />
        <Input
          type="TEXT"
          name="answerB"
          displayLabel="Answer B"
          value={answerB}
          onValueChange={(value) => setanswerB(value)}
        />
        <Input
          type="TEXT"
          name="answerC"
          displayLabel="Answer C"
          value={answerC}
          onValueChange={(value) => setanswerC(value)}
        />
        <Input
          type="TEXT"
          name="answerD"
          displayLabel="Answer D"
          value={answerD}
          onValueChange={(value) => setanswerD(value)}
        />
        <Input
          type="VARCHAR(255)"
          name="correctAnswer"
          displayLabel="Correct Answer"
          value={correctAnswer}
          onValueChange={(value) => setcorrectAnswer(value)}
        />
        <Input
          type="TEXT"
          name="explanation"
          displayLabel="Explanation"
          value={explanation}
          onValueChange={(value) => setexplanation(value)}
        />
        <Input
          type="SELECT"
          query={require('../../et_course_template/apis').default.ALL}
          idKey="id"
          labelKey="name"
          name="courseTemplateId"
          displayLabel="Course Template Id"
          value={courseTemplateId}
          onValueChange={(value) => setcourseTemplateId(value)}
        />
        <Input
          type="SELECT"
          query={require('../../et_course_template_question_source/apis').default.ALL}
          idKey="id"
          labelKey="name"
          name="questionSourceId"
          displayLabel="Question Source Id"
          value={questionSourceId}
          onValueChange={(value) => setquestionSourceId(value)}
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
