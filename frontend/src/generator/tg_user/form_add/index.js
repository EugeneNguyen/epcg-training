import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Button} from '../../_components/button';
import {Box} from '../../_components';


export default function FormTgUserAdd({fixedParams}) {
  const history = useHistory();

  const [username, setusername] = useState(null);
  const [password, setpassword] = useState(null);
  const [permissionsRelationship, setpermissionsRelationship] = useState([]);
  const [rolesRelationship, setrolesRelationship] = useState([]);
  const [coursesRelationship, setcoursesRelationship] = useState([]);

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = (addAnother) => () => {
    console.log(addAnother);
    const data = {
      username,
      password,
      permissions: permissionsRelationship,
      roles: rolesRelationship,
      courses: coursesRelationship,
      ...fixedParams,
    };
    apiAdd({variables: {data}})
      .then(() => {
        toast.success('Add completed');
        if (!addAnother) {
          history.goBack();
        }
      })
  }

  return (
    <Box title="Add new tgUser" padding>
      <Form onSubmitParams={handleSubmit(false)}>
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
        <Button onClick={handleSubmit(false)}>
          Submit
        </Button>
      </div>
    </Box>
  );
}
