import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Button} from '../../_components/button';
import {Box} from '../../_components';

            
export default function FormEtCourseEnrollEdit({fixedParams, parent={}}) {
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

  const [courseId, setcourseId] = useState(null);
  const [userId, setuserId] = useState(null);
  const [isActive, setisActive] = useState(null);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id },
      onCompleted: (response) => {
        setcourseId(response.data.courseId);
        setuserId(response.data.userId);
        setisActive(response.data.isActive);

      },
    }
  );

  const [editApi] = useMutation(API.EDIT);

  const handleSubmit = () => {
    const data = {
      courseId,
      userId,
      isActive,
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
      title="Edit etCourseEnroll"
      padding
      footer={(
        <Button onClick={handleSubmit}>
          Update
        </Button>
      )}
    >
      <Form onSubmitParams={handleSubmit}>
        {(!fixedParams || !fixedParams.courseId) && (
          <Input
            type="SELECT"
            query={require('../../et_course/apis').default.ALL}
            idKey="id"
            labelKey="name"
            name="courseId"
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
            name="userId"
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
