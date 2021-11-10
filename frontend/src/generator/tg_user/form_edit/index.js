import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box} from '../../_components';

          
export default function FormTgUserEdit({fixedParams}) {
  const id = useParams().selectedObjectId;
  const history = useHistory();

  const [username, setusername] = useState(null);
  const [permissionsRelationship, setpermissionsRelationship] = useState([]);
  const [rolesRelationship, setrolesRelationship] = useState([]);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id },
      onCompleted: (response) => {
        setusername(response.data.username);

        setpermissionsRelationship(response.data.permissions.map(r => r.id));
        setrolesRelationship(response.data.roles.map(r => r.id));
      },
    }
  );

  const [editApi] = useMutation(API.EDIT);

  const handleSubmit = (params) => {
    const data = {
      username,
      permissions: permissionsRelationship,
      roles: rolesRelationship,
      ...fixedParams,
    };
    editApi({ variables: { id, data } })
      .then(() => {
        toast.success('Edit completed');
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
        <Input
          type="SELECT"
          query={require('../../tg_permission/apis').default.ALL}
          idKey="id"
          labelKey="name"
          name="permissions"
          displayLabel="Permissions"
          value={permissionsRelationship}
          onValueChange={(value) => setpermissionsRelationship(value)}
          isMulti
        />
        <Input
          type="SELECT"
          query={require('../../tg_role/apis').default.ALL}
          idKey="id"
          labelKey="name"
          name="roles"
          displayLabel="Roles"
          value={rolesRelationship}
          onValueChange={(value) => setrolesRelationship(value)}
          isMulti
        />
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
