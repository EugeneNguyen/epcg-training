import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box} from '../../_components';


export default function FormTgRoleAdd({fixedParams}) {
  const history = useHistory();

  const [name, setname] = useState(null);
  const [description, setdescription] = useState(null);
  const [membersRelationship, setmembersRelationship] = useState([]);
  const [permissionRelationship, setpermissionRelationship] = useState([]);

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = () => {
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
        history.goBack();
      })
  }

  return (
    <Box title="Add new tgRole" padding>
      <Form onSubmitParams={handleSubmit}>
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
