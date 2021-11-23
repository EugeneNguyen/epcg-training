import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Button} from '../../_components/button';
import {Box} from '../../_components';

                
export default function FormEtExamAttemptEdit({fixedParams}) {
  const id = useParams().selectedObjectId;
  const history = useHistory();

  const [templateExamId, settemplateExamId] = useState(null);
  const [duration, setduration] = useState(null);
  const [startTime, setstartTime] = useState(null);
  const [endTime, setendTime] = useState(null);
  const [createdAt, setcreatedAt] = useState(null);
  const [updatedAt, setupdatedAt] = useState(null);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id },
      onCompleted: (response) => {
        settemplateExamId(response.data.templateExamId);
        setduration(response.data.duration);
        setstartTime(response.data.startTime);
        setendTime(response.data.endTime);
        setcreatedAt(response.data.createdAt);
        setupdatedAt(response.data.updatedAt);

      },
    }
  );

  const [editApi] = useMutation(API.EDIT);

  const handleSubmit = () => {
    const data = {
      templateExamId,
      duration,
      startTime,
      endTime,
      createdAt,
      updatedAt,
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
      title="Edit etExamAttempt"
      padding
      footer={(
        <Button onClick={handleSubmit}>
          Update
        </Button>
      )}
    >
      <Form onSubmitParams={handleSubmit}>
        {(!fixedParams || !fixedParams.templateExamId) && (
          <Input
            type="SELECT"
            query={require('../../et_course_template_exam/apis').default.ALL}
            idKey="id"
            labelKey="name"
            name="templateExamId"
            displayLabel="Template Exam"
            value={templateExamId}
            onValueChange={(value) => settemplateExamId(value)}
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
        {(!fixedParams || !fixedParams.startTime) && (
          <Input
            type="DATETIME"
            name="startTime"
            displayLabel="Start Time"
            value={startTime}
            onValueChange={(value) => setstartTime(value)}
          />
        )}
        {(!fixedParams || !fixedParams.endTime) && (
          <Input
            type="DATETIME"
            name="endTime"
            displayLabel="End Time"
            value={endTime}
            onValueChange={(value) => setendTime(value)}
          />
        )}
        {(!fixedParams || !fixedParams.createdAt) && (
          <Input
            type="DATETIME"
            name="createdAt"
            displayLabel="Created At"
            value={createdAt}
            onValueChange={(value) => setcreatedAt(value)}
          />
        )}
        {(!fixedParams || !fixedParams.updatedAt) && (
          <Input
            type="DATETIME"
            name="updatedAt"
            displayLabel="Updated At"
            value={updatedAt}
            onValueChange={(value) => setupdatedAt(value)}
          />
        )}
      </Form>
    </Box>
  );
}
