import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Button} from '../../_components/button';
import {Box} from '../../_components';

                            
export default function FormEtCourseTemplateQuestionMcqEdit({fixedParams, parent={}}) {
  if (parent.query) {
    return <FormEditWithParent fixedParams={fixedParams} parent={parent}/>
  }
  return <FormEdit fixedParams={fixedParams}/>
}

function FormEditWithParent({fixedParams, parent}) {
  const {data, error, loading} = useQuery(parent.query, {variables: parent.variables});
  if (loading) return null;
  if (error) return null;
  return (
    <FormEdit fixedParams={fixedParams} parent={data.data}/>
  );
}

function FormEdit({fixedParams, parent={}}) {
  const id = useParams().selectedObjectId;
  const history = useHistory();

  const [questionCode, setquestionCode] = useState(null);
  const [question, setquestion] = useState(null);
  const [questionImageId, setquestionImageId] = useState(null);
  const [answerA, setanswerA] = useState(null);
  const [answerB, setanswerB] = useState(null);
  const [answerC, setanswerC] = useState(null);
  const [answerD, setanswerD] = useState(null);
  const [correctAnswer, setcorrectAnswer] = useState(null);
  const [explanation, setexplanation] = useState(null);
  const [courseTemplateId, setcourseTemplateId] = useState(null);
  const [questionSourceId, setquestionSourceId] = useState(null);
  const [tagsRelationship, settagsRelationship] = useState([]);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id },
      onCompleted: (response) => {
        setquestionCode(response.data.questionCode);
        setquestion(response.data.question);
        setquestionImageId(response.data.questionImageId);
        setanswerA(response.data.answerA);
        setanswerB(response.data.answerB);
        setanswerC(response.data.answerC);
        setanswerD(response.data.answerD);
        setcorrectAnswer(response.data.correctAnswer);
        setexplanation(response.data.explanation);
        setcourseTemplateId(response.data.courseTemplateId);
        setquestionSourceId(response.data.questionSourceId);

        settagsRelationship(response.data.tags.map(r => r.id));
      },
    }
  );

  const [editApi] = useMutation(API.EDIT);

  const handleSubmit = () => {
    const data = {
      questionCode,
      question,
      questionImageId,
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
    editApi({ variables: { id, data } })
      .then(() => {
        toast.success('Edit completed');
        history.goBack();
      })
      .catch(error => toast.error(error.message));
  }

  return (
    <Box
      title="Edit etCourseTemplateQuestionMCQ"
      padding
      footer={(
        <Button onClick={handleSubmit}>
          Update
        </Button>
      )}
    >
      <Form onSubmitParams={handleSubmit}>
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
        {(!fixedParams || !fixedParams.questionImageId) && (
          <Input
            type="SELECT"
            query={require('../../tg_file/apis').default.ALL}
            idKey="id"
            labelKey="originalName"
            name="questionImageId"
            displayLabel="Question Image"
            value={questionImageId}
            onValueChange={(value) => setquestionImageId(value)}
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
            name="courseTemplateId"
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
            name="questionSourceId"
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
