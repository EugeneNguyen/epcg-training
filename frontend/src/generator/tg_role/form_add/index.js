import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Button} from '../../_components/button';
import {Box} from '../../_components';


export default function FormTgRoleAdd({fixedParams}) {
  const history = useHistory();

  const [name, setname] = useState(null);
  const [description, setdescription] = useState(null);
  const [membersRelationship, setmembersRelationship] = useState([]);
  const [permissionRelationship, setpermissionRelationship] = useState([]);

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = (addAnother) => () => {
    const data = {
      name,
      description,
      members: membersRelationship,
      permission: permissionRelationship,
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
    <Box title="Add new tgRole" padding>
      <Form onSubmitParams={handleSubmit(false)}>
        <div class="grid grid-cols-1 gap-2">
        {(!fixedParams || !fixedParams.name) && (
          <Input
            type="VARCHAR(255)"
            name="name"
            displayLabel="Name"
            value={name}
            onValueChange={(value) => setname(value)}
          />
        )}
        {(!fixedParams || !fixedParams.description) && (
          <Input
            type="VARCHAR(255)"
            name="description"
            displayLabel="Description"
            value={description}
            onValueChange={(value) => setdescription(value)}
          />
        )}
        <Input
          type="SELECT"
          query={require('../../tg_user/apis').default.ALL}
          idKey="id"
          labelKey="username"
          name="members"
          displayLabel="Members"
          value={membersRelationship}
          onValueChange={(value) => setmembersRelationship(value)}
          isMulti
        />
        <Input
          type="SELECT"
          query={require('../../tg_permission/apis').default.ALL}
          idKey="id"
          labelKey="name"
          name="permission"
          displayLabel="Permissions"
          value={permissionRelationship}
          onValueChange={(value) => setpermissionRelationship(value)}
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
