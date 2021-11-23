import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box, Button} from '../../_components';


export default function FormTgUserRoleAdd({fixedParams}) {
  const history = useHistory();

  const [userId, setuserId] = useState(null);
  const [roleId, setroleId] = useState(null);

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = (addAnother) => () => {
    const data = {
      userId,
      roleId,
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
      title="Add new tgUserRole"
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
        {(!fixedParams || !fixedParams.roleId) && (
          <Input
            type="SELECT"
            query={require('../../tg_role/apis').default.ALL}
            idKey="id"
            labelKey="name"
            displayLabel="Role"
            value={roleId}
            onValueChange={(value) => setroleId(value)}
          />
        )}
      </Form>
    </Box>
  );
}
