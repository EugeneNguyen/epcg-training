import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box} from '../../_components';

export default function FormEtCourseTemplateExamQuestionAdd({fixedParams}) {
  const history = useHistory();

  const [examId, setexamId] = useState(null);
  const [questionId, setquestionId] = useState(null);
  const [order, setorder] = useState(null);

  const [apiAdd, { data, loading, error }] = useMutation(API.ADD);

  const handleSubmit = (params) => {
    console.log(params);
    return;
    apiAdd({ variables: { data: params } })
      .then(() => {
        toast.success('Add completed');
        history.goBack();
      })
  }

  return (
    <Box title="Add new etCourseTemplateExamQuestion" padding>
      <Form onSubmitParams={handleSubmit}>
        <div class="grid grid-cols-1 gap-2">
        {fixedParams && fixedParams.examId ? (
          <Input type="HIDDEN" name="examId" value={fixedParams.examId} />
        ) : (
          <Input
            type="CHAR(36)"
            name="examId"
            displayLabel="Exam Id"
            value={examId}
            onValueChange={(value) => setexamId(value)}
          />
        )}
        {fixedParams && fixedParams.questionId ? (
          <Input type="HIDDEN" name="questionId" value={fixedParams.questionId} />
        ) : (
          <Input
            type="SELECT"
            query={require('../../et_course_template_question_mcq/apis').default.ALL}
            idKey="id"
            labelKey="questionCode"
            name="questionId"
            displayLabel="Question"
            value={questionId}
            onValueChange={(value) => setquestionId(value)}
          />
        )}
        {fixedParams && fixedParams.order ? (
          <Input type="HIDDEN" name="order" value={fixedParams.order} />
        ) : (
          <Input
            type="INT"
            name="order"
            displayLabel="Order"
            value={order}
            onValueChange={(value) => setorder(value)}
          />
        )}
        </div>
        <div class="flex mt-2">
          <button
            type="submit"
            name="_submit_type_asdf"
            value="submit"
            class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Submit
          </button>
          <button
            type="submit"
            name="_submit_type_qwer"
            value="submit_and_add_more"
            class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Submit and Add another
          </button>
        </div>
      </Form>
    </Box>
  );
}
