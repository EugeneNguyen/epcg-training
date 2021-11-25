import {useMutation, useQuery} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box, Button} from '../../_components';


export default function FormEtCourseEnrollAdd({fixedParams, parent={}}) {
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

  const [courseId, setcourseId] = useState(null);
  const [userId, setuserId] = useState(null);
  const [isActive, setisActive] = useState(null);

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = (addAnother) => () => {
    const data = {
      courseId,
      userId,
      isActive,
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
      title="Add new etCourseEnroll"
      padding
      footer={(
        <div class="flex space-x-2">
          <Button onClick={handleSubmit(false)}>
            Submit
          </Button>
        </div>
      )}
    >
      <Form onSubmitParams={handleSubmit(false)}>
        {(!fixedParams || !fixedParams.courseId) && (
          <Input
            type="SELECT"
            query={require('../../et_course/apis').default.ALL}
            idKey="id"
            labelKey="name"
            displayLabel="Course"
            value={courseId}
            onValueChange={(value) => setcourseId(value)}
          />
        )}
        {(!fixedParams || !fixedParams.userId) && (
          <Input
            type="SELECT"
            query={require('../../tg_user/apis').default.ALL}
            idKey="id"
            labelKey="username"
            displayLabel="User"
            value={userId}
            onValueChange={(value) => setuserId(value)}
          />
        )}
        {(!fixedParams || !fixedParams.isActive) && (
          <Input
            type="TINYINT(1)"
            name="isActive"
            displayLabel="Is Active"
            value={isActive}
            onValueChange={(value) => setisActive(value)}
          />
        )}
      </Form>
    </Box>
  );
}
