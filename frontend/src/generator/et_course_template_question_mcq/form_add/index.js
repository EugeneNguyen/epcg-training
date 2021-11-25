import {useMutation, useQuery} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box, Button} from '../../_components';


export default function FormEtCourseTemplateQuestionMcqAdd({fixedParams, parent={}}) {
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

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = (addAnother) => () => {
    const data = {
      questionCode,
      question,
      answerA,
      answerB,
      answerC,
      answerD,
      correctAnswer,
      explanation,
      courseTemplateId,
      questionSourceId,
      tags: tagsRelationship,
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
      title="Add new etCourseTemplateQuestionMCQ"
      padding
      footer={(
        <div class="flex space-x-2">
          <Button onClick={handleSubmit(false)}>
            Submit
          </Button>
          <Button onClick={handleSubmit(true)}>
            Save and add another
          </Button>
        </div>
      )}
    >
      <Form onSubmitParams={handleSubmit(false)}>
        {(!fixedParams || !fixedParams.questionCode) && (
          <Input
            type="VARCHAR(255)"
            name="questionCode"
            displayLabel="Question Code"
            value={questionCode}
            onValueChange={(value) => setquestionCode(value)}
          />
        )}
        {(!fixedParams || !fixedParams.question) && (
          <Input
            type="TEXT"
            name="question"
            displayLabel="Question"
            value={question}
            onValueChange={(value) => setquestion(value)}
          />
        )}
        {(!fixedParams || !fixedParams.answerA) && (
          <Input
            type="TEXT"
            name="answerA"
            displayLabel="Answer A"
            value={answerA}
            onValueChange={(value) => setanswerA(value)}
          />
        )}
        {(!fixedParams || !fixedParams.answerB) && (
          <Input
            type="TEXT"
            name="answerB"
            displayLabel="Answer B"
            value={answerB}
            onValueChange={(value) => setanswerB(value)}
          />
        )}
        {(!fixedParams || !fixedParams.answerC) && (
          <Input
            type="TEXT"
            name="answerC"
            displayLabel="Answer C"
            value={answerC}
            onValueChange={(value) => setanswerC(value)}
          />
        )}
        {(!fixedParams || !fixedParams.answerD) && (
          <Input
            type="TEXT"
            name="answerD"
            displayLabel="Answer D"
            value={answerD}
            onValueChange={(value) => setanswerD(value)}
          />
        )}
        {(!fixedParams || !fixedParams.correctAnswer) && (
          <Input
            type="VARCHAR(255)"
            name="correctAnswer"
            displayLabel="Correct Answer"
            value={correctAnswer}
            onValueChange={(value) => setcorrectAnswer(value)}
          />
        )}
        {(!fixedParams || !fixedParams.explanation) && (
          <Input
            type="TEXT"
            name="explanation"
            displayLabel="Explanation"
            value={explanation}
            onValueChange={(value) => setexplanation(value)}
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
        {(!fixedParams || !fixedParams.questionSourceId) && (
          <Input
            type="SELECT"
            query={require('../../et_course_template_question_source/apis').default.ALL}
            idKey="id"
            labelKey="name"
            displayLabel="Question Source"
            value={questionSourceId}
            onValueChange={(value) => setquestionSourceId(value)}
            variables={{courseTemplateId: fixedParams.courseTemplateId}}
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
          variables={{courseTemplateId: fixedParams.courseTemplateId}}
          isMulti
        />
      </Form>
    </Box>
  );
}
