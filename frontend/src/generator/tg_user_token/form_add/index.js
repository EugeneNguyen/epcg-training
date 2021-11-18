import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Button} from '../../_components/button';
import {Box} from '../../_components';


export default function FormTgUserTokenAdd({fixedParams}) {
  const history = useHistory();

  const [userId, setuserId] = useState(null);
  const [createdAt, setcreatedAt] = useState(null);
  const [updatedAt, setupdatedAt] = useState(null);

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = (addAnother) => () => {
    const data = {
      userId,
      createdAt,
      updatedAt,
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
    <Box title="Add new tgUserToken" padding>
      <Form onSubmitParams={handleSubmit(false)}>
        <div class="grid grid-cols-1 gap-2">
        {(!fixedParams || !fixedParams.userId) && (
          <Input
            type="CHAR(36)"
            name="userId"
            displayLabel="User Id"
            value={userId}
            onValueChange={(value) => setuserId(value)}
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
