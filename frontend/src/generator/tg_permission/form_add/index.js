import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box, Button} from '../../_components';


export default function FormTgPermissionAdd({fixedParams}) {
  const history = useHistory();

  const [name, setname] = useState(null);
  const [description, setdescription] = useState(null);
  const [groupId, setgroupId] = useState(null);
  const [rolesRelationship, setrolesRelationship] = useState([]);

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = (addAnother) => () => {
    const data = {
      name,
      description,
      groupId,
      roles: rolesRelationship,
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
      title="Add new tgPermission"
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
        {(!fixedParams || !fixedParams.groupId) && (
          <Input
            type="SELECT"
            query={require('../../tg_permission_group/apis').default.ALL}
            idKey="id"
            labelKey="name"
            displayLabel="Group"
            value={groupId}
            onValueChange={(value) => setgroupId(value)}
          />
        )}
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
      </Form>
    </Box>
  );
}
