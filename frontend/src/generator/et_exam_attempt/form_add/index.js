import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box} from '../../_components';

export default function FormEtExamAttemptAdd({fixedParams}) {
  const history = useHistory();

  const [templateExamId, settemplateExamId] = useState(null);
  const [duration, setduration] = useState(null);
  const [startTime, setstartTime] = useState(null);
  const [endTime, setendTime] = useState(null);
  const [createdAt, setcreatedAt] = useState(null);
  const [updatedAt, setupdatedAt] = useState(null);

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
    <Box title="Add new etExamAttempt" padding>
      <Form onSubmitParams={handleSubmit}>
        <div class="grid grid-cols-1 gap-2">
        {fixedParams && fixedParams.templateExamId ? (
          <Input type="HIDDEN" name="templateExamId" value={fixedParams.templateExamId} />
        ) : (
          <Input
            type="CHAR(36)"
            name="templateExamId"
            displayLabel="Template Exam Id"
            value={templateExamId}
            onValueChange={(value) => settemplateExamId(value)}
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
        {fixedParams && fixedParams.startTime ? (
          <Input type="HIDDEN" name="startTime" value={fixedParams.startTime} />
        ) : (
          <Input
            type="DATETIME"
            name="startTime"
            displayLabel="Start Time"
            value={startTime}
            onValueChange={(value) => setstartTime(value)}
          />
        )}
        {fixedParams && fixedParams.endTime ? (
          <Input type="HIDDEN" name="endTime" value={fixedParams.endTime} />
        ) : (
          <Input
            type="DATETIME"
            name="endTime"
            displayLabel="End Time"
            value={endTime}
            onValueChange={(value) => setendTime(value)}
          />
        )}
        {fixedParams && fixedParams.createdAt ? (
          <Input type="HIDDEN" name="createdAt" value={fixedParams.createdAt} />
        ) : (
          <Input
            type="DATETIME"
            name="createdAt"
            displayLabel="Created At"
            value={createdAt}
            onValueChange={(value) => setcreatedAt(value)}
          />
        )}
        {fixedParams && fixedParams.updatedAt ? (
          <Input type="HIDDEN" name="updatedAt" value={fixedParams.updatedAt} />
        ) : (
          <Input
            type="DATETIME"
            name="updatedAt"
            displayLabel="Updated At"
            value={updatedAt}
            onValueChange={(value) => setupdatedAt(value)}
          />
        )}
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
