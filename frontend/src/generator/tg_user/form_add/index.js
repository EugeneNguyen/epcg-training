import {useMutation, useQuery} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box, Button} from '../../_components';


export default function FormTgUserAdd({fixedParams, parent={}}) {
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

  const [username, setusername] = useState(null);
  const [password, setpassword] = useState(null);
  const [name, setname] = useState(null);
  const [permissionsRelationship, setpermissionsRelationship] = useState([]);
  const [rolesRelationship, setrolesRelationship] = useState([]);
  const [coursesRelationship, setcoursesRelationship] = useState([]);

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = (addAnother) => () => {
    const data = {
      username,
      password,
      name,
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
      .catch(error => toast.error(error.message));
  }

  return (
    <Box
      title="Add new tgUser"
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
        {(!fixedParams || !fixedParams.name) && (
          <Input
            type="VARCHAR(255)"
            name="name"
            displayLabel="Name"
            value={name}
            onValueChange={(value) => setname(value)}
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
      </Form>
    </Box>
  );
}
