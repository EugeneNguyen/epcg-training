import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Button} from '../../_components/button';
import {Box} from '../../_components';


export default function FormEtCourseEnrollAdd({fixedParams}) {
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
    <Box title="Add new etCourseEnroll" padding>
      <Form onSubmitParams={handleSubmit(false)}>
        <div class="grid grid-cols-1 gap-2">
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
