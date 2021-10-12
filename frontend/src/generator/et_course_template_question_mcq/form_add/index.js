import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box} from '../../_components';

export default function FormEtCourseTemplateQuestionMcqAdd({fixedParams}) {
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
          const [tagsRelationship, settagsRelationship] = useState([]);
  
  const [apiAdd, { data, loading, error }] = useMutation(API.ADD, {
    onCompleted: () => {
      toast.success('Add completed');
      history.goBack();
    }
  });

  const handleSubmit = (params) => {
    apiAdd({ variables: { data: params } });
  }

  return (
    <Box title="Add new etCourseTemplateQuestionMCQ" padding>
      <Form onSubmitParams={handleSubmit}>
        <div class="grid grid-cols-1 gap-2">
        {fixedParams && fixedParams.questionCode ? (
          <Input type="HIDDEN" name="questionCode" value={fixedParams.questionCode} />
        ) : (
          <Input
            type="VARCHAR(255)"
            name="questionCode"
            displayLabel="Question Code"
            value={questionCode}
            onValueChange={(value) => setquestionCode(value)}
          />
        )}
        {fixedParams && fixedParams.question ? (
          <Input type="HIDDEN" name="question" value={fixedParams.question} />
        ) : (
          <Input
            type="TEXT"
            name="question"
            displayLabel="Question"
            value={question}
            onValueChange={(value) => setquestion(value)}
          />
        )}
        {fixedParams && fixedParams.answerA ? (
          <Input type="HIDDEN" name="answerA" value={fixedParams.answerA} />
        ) : (
          <Input
            type="TEXT"
            name="answerA"
            displayLabel="Answer A"
            value={answerA}
            onValueChange={(value) => setanswerA(value)}
          />
        )}
        {fixedParams && fixedParams.answerB ? (
          <Input type="HIDDEN" name="answerB" value={fixedParams.answerB} />
        ) : (
          <Input
            type="TEXT"
            name="answerB"
            displayLabel="Answer B"
            value={answerB}
            onValueChange={(value) => setanswerB(value)}
          />
        )}
        {fixedParams && fixedParams.answerC ? (
          <Input type="HIDDEN" name="answerC" value={fixedParams.answerC} />
        ) : (
          <Input
            type="TEXT"
            name="answerC"
            displayLabel="Answer C"
            value={answerC}
            onValueChange={(value) => setanswerC(value)}
          />
        )}
        {fixedParams && fixedParams.answerD ? (
          <Input type="HIDDEN" name="answerD" value={fixedParams.answerD} />
        ) : (
          <Input
            type="TEXT"
            name="answerD"
            displayLabel="Answer D"
            value={answerD}
            onValueChange={(value) => setanswerD(value)}
          />
        )}
        {fixedParams && fixedParams.correctAnswer ? (
          <Input type="HIDDEN" name="correctAnswer" value={fixedParams.correctAnswer} />
        ) : (
          <Input
            type="VARCHAR(255)"
            name="correctAnswer"
            displayLabel="Correct Answer"
            value={correctAnswer}
            onValueChange={(value) => setcorrectAnswer(value)}
          />
        )}
        {fixedParams && fixedParams.explanation ? (
          <Input type="HIDDEN" name="explanation" value={fixedParams.explanation} />
        ) : (
          <Input
            type="TEXT"
            name="explanation"
            displayLabel="Explanation"
            value={explanation}
            onValueChange={(value) => setexplanation(value)}
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
        {fixedParams && fixedParams.questionSourceId ? (
          <Input type="HIDDEN" name="questionSourceId" value={fixedParams.questionSourceId} />
        ) : (
          <Input
            type="SELECT"
            query={require('../../et_course_template_question_source/apis').default.ALL}
            idKey="id"
            labelKey="name"
            name="questionSourceId"
            displayLabel="Question Source"
            value={questionSourceId}
            onValueChange={(value) => setquestionSourceId(value)}
          />
        )}
        <Input
          type="SELECT"
          query={require('../../et_course_template_question_tag/apis').default.ALL}
          idKey="id"
          labelKey="name"
          name="tags"
          displayLabel="Tags"
          value={tagsRelationship}
          onValueChange={(value) => settagsRelationship(value)}
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
