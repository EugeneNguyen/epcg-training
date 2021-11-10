import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box} from '../../_components';


export default function FormTgUserAdd({fixedParams}) {
  const history = useHistory();

  const [username, setusername] = useState(null);
  const [password, setpassword] = useState(null);

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = () => {
    const data = {
      username,
      password,
      ...fixedParams,
    };
    apiAdd({variables: {data}})
      .then(() => {
        toast.success('Add completed');
        history.goBack();
      })
  }

  return (
    <Box title="Add new tgUser" padding>
      <Form onSubmitParams={handleSubmit}>
        <div class="grid grid-cols-1 gap-2">
        {(!fixedParams || !fixedParams.username) && (
          <Input
            type="VARCHAR(255)"
            name="username"
            displayLabel="Username"
            value={username}
            onValueChange={(value) => setusername(value)}
          />
        )}
        {(!fixedParams || !fixedParams.password) && (
          <Input
            type="VARCHAR(255)"
            name="password"
            displayLabel="Password"
            value={password}
            onValueChange={(value) => setpassword(value)}
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
