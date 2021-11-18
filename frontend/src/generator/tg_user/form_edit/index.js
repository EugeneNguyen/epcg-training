import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Button} from '../../_components/button';
import {Box} from '../../_components';

          
export default function FormTgUserEdit({fixedParams}) {
  const id = useParams().selectedObjectId;
  const history = useHistory();

  const [username, setusername] = useState(null);
  const [permissionsRelationship, setpermissionsRelationship] = useState([]);
  const [rolesRelationship, setrolesRelationship] = useState([]);
  const [coursesRelationship, setcoursesRelationship] = useState([]);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id },
      onCompleted: (response) => {
        setusername(response.data.username);

        setpermissionsRelationship(response.data.permissions.map(r => r.id));
        setrolesRelationship(response.data.roles.map(r => r.id));
        setcoursesRelationship(response.data.courses.map(r => r.id));
      },
    }
  );

  const [editApi] = useMutation(API.EDIT);

  const handleSubmit = () => {
    const data = {
      username,
      permissions: permissionsRelationship,
      roles: rolesRelationship,
      courses: coursesRelationship,
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
    <Box title="Edit tgUser" padding>
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
        <Input
          type="SELECT"
          query={require('../../et_course/apis').default.ALL}
          idKey="id"
          labelKey="name"
          name="courses"
          displayLabel="Courses"
          value={coursesRelationship}
          onValueChange={(value) => setcoursesRelationship(value)}
          isMulti
        />
        </div>
        <input type="submit" class="invisible" />
      </Form>
      <div class="flex space-x-2">
        <Button onClick={handleSubmit}>
          Update
        </Button>
      </div>
    </Box>
  );
}
